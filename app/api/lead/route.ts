import { NextResponse } from "next/server";
import { Resend } from "resend";
import { leadSchema, isMultiLocation } from "@/lib/lead";
import { composeLeadSubject, composeLeadText } from "@/lib/lead-email";

/**
 * Validates a wholesale enquiry and emails it to the business.
 *
 * Unlike the sibling projects (Therafix, Chroma Group), where this route
 * validated a lead and then dropped it behind a "TODO: CRM wiring" comment,
 * this one completes: a valid lead becomes an email in a real inbox.
 *
 * That changes the risk profile. An open, unauthenticated POST that merely
 * logged was a nuisance if abused; one that SENDS EMAIL can be used to flood an
 * inbox and burn a Resend quota. Hence the honeypot and the rate limit below.
 * Both are a floor, not a ceiling — if this ever gets targeted properly, the
 * next step is Turnstile or hCaptcha in front of the submit.
 *
 * THE CONTRACT WITH THE CLIENT, which the form depends on:
 *   400 invalid_json   — body was not JSON
 *   422 invalid        — failed validation, with fieldErrors
 *   429 rate_limited   — too many from this IP
 *   502 send_failed    — WE ACCEPTED IT BUT COULD NOT SEND. The form must show
 *                        the prefilled mailto fallback on this one, or the lead
 *                        is silently lost and the visitor never finds out.
 *   200 { ok: true }   — sent
 */

/** Max submissions per IP per window. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

/* In-memory, so it resets on cold start and is per-instance rather than
   global. That is a real limitation and it is the right trade here: it stops
   the naive case at zero cost and zero dependencies. A determined abuser
   walking IPs defeats it, which is what the captcha note above is for. */
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  /* Keep the map from growing without bound on a long-lived instance. */
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT;
}

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "invalid", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const lead = parsed.data;

  /* Honeypot. A 200 with no send: the bot cannot tell it was caught, so it has
     nothing to adapt to. Never a 4xx here — that is free feedback for it. */
  if (lead.website) {
    console.log("[lead] dropped: honeypot");
    return NextResponse.json({ ok: true });
  }

  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  /* Log the SHAPE of the lead, never its contents. Name, café, email, city and
     the free-text message stay out of the server log — they are the visitor's
     personal data and a log is the wrong place for them. */
  console.log(
    `[lead] locations=${lead.locations} volume=${lead.volume} ` +
      `products=${lead.products.length} multi=${isMultiLocation(lead) ? "y" : "n"} ` +
      `phone=${lead.phone ? "y" : "n"} message=${lead.message ? "y" : "n"}`,
  );

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    /* Misconfiguration, not visitor error. Shout about it in the log and hand
       the visitor the mailto fallback rather than a success screen for an
       email that was never sent. */
    console.error(
      "[lead] NOT SENT — missing env. " +
        `RESEND_API_KEY=${apiKey ? "set" : "MISSING"} ` +
        `LEAD_TO_EMAIL=${to ? "set" : "MISSING"} ` +
        `LEAD_FROM_EMAIL=${from ? "set" : "MISSING"}`,
    );
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: composeLeadSubject(lead),
      text: composeLeadText(lead),
      /* So the business can just hit reply and be talking to the café. */
      replyTo: lead.email,
    });

    if (error) throw new Error(error.message);
  } catch (err) {
    /* The ONE place the full lead is allowed into the log: the email did not
       send, so this log line is the only remaining copy on our side. Losing it
       loses the lead outright. The visitor also gets the mailto fallback, so
       there are two independent paths for the enquiry to survive. */
    console.error("[lead] SEND FAILED — full payload follows so the lead is not lost");
    console.error(JSON.stringify(lead));
    console.error(err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

