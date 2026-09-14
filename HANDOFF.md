# MyGuatemalanCoffee.com — handoff

## What this is

A one-page wholesale pitch aimed at US café buyers, with a lead-capture form
that emails enquiries straight to the business.

The argument the page makes, in one line: **three coffees — an eight-region
blend plus two single-origin lots — are a complete bar program from one
supplier**, so a café expands its menu by opening one account rather than
three. The quality claim rests on Guatemala's altitude-based SHB grading,
because that is the one claim a buyer can verify without tasting anything.

It is deliberately **not** a "we are a coffee company" brochure. It is an
additive pitch to a buyer who already has a roaster, and the copy never
suggests otherwise.

| | |
|---|---|
| Stack | Next.js 16.3.4 App Router (Turbopack), React 19.2.8, TypeScript 5 strict, Tailwind v4, zod 4, Resend 4.8 |
| Local | `npm run dev` → http://localhost:3000 (3001 if Chroma Group's server already holds 3000) |
| Deployed | Not yet. No Vercel project linked. |
| Plan | `IMPLEMENTATION_PLAN.md` in this repo |
| Siblings | `D:\Coding_Lessons\Therafix`, `D:\Coding_Lessons\Chroma_Group` — same template |

---

## Verified at handoff

Run in this session, against the running dev server — not assumed:

- `npm run build`, `npm run lint`, `npx tsc --noEmit` — all clean.
- **Contrast: 43 distinct rendered text/background pairs, 0 failures, lowest
  4.92:1.** Measured on the *composited* colour, so alpha-modified text
  (the `bg-warm/10` pending badges) was checked properly rather than against
  its nominal token.
- **No horizontal page scroll at 375px.** The only elements wider than the
  viewport are the regions table and its children, inside their own
  `overflow-x-auto` container — the intended exception.
- All five API paths: `200` valid, `200` honeypot (silently dropped),
  `422` invalid with field errors, `400` bad JSON, `429` rate limited
  (trips exactly at 5/hour), `502` send failure.
- Client validation: focus moves to the error summary, `aria-invalid` lands on
  the right fields, per-field messages render.
- The 502 → fallback path end to end: the prefilled `mailto` carries the café
  name and both selected coffees.
- Both halves of the noindex guard on: `/robots.txt` disallows and the rendered
  head carries `noindex, nofollow`.
- Skip link is first in the tab order; 32 focusable elements; the honeypot has
  `tabIndex=-1` and is not reachable.
- FAQ disclosure works with zero JavaScript.

### Not verified

- **Nothing has run on real mobile hardware.** 375px was tested in a resized
  iframe. iOS Safari's keyboard, `dvh`, and safe-area insets on a notched
  phone are all untested.
- **`prefers-reduced-motion` was not toggled at the OS level.** The CSS block
  is present and correct by inspection; it was not exercised.
- **No email has ever actually been sent.** Resend is unconfigured, so every
  submit so far has taken the 502 fallback path. See trap 2.
- No automated tests exist.

---

## Where things live

```
app/
  layout.tsx          fonts, metadata, JSON-LD, PRE-LAUNCH noindex guard #1
  page.tsx            composition only — the running order of the argument
  globals.css         THE CONTRAST RULE + all three palettes + keyframes
  robots.ts           PRE-LAUNCH noindex guard #2
  preview/page.tsx    the decision workbench — DELETE once you have chosen
  api/lead/route.ts   validate → honeypot → rate limit → Resend → respond
components/           one file per section, kebab-case, PascalCase named exports
  ui.tsx              cx, Section, SectionLabel, SectionHeading, Lede,
                      ButtonLink, Pending, MaybePending
  logo.tsx            all three marks + wordmark lockups + ACTIVE_MARK
lib/
  site.ts             contact + URLs. Nothing else may hardcode an address.
  regions.ts          the 8 Anacafé regions: ids, altitude bands, soil
  products.ts         the 3 coffees + PRODUCT_IDS tuple feeding z.enum()
  copy.ts             EVERY reader-facing string + the copy rules
  lead.ts             zod schema, shared client and server
  lead-email.ts       the one composer for both the real email and the fallback
```

---

## Decisions already made — don't relitigate these

1. **Colours are named by ROLE, not by hue.** There is deliberately no
   `text-emerald` utility to misuse. `--color-accent` is guaranteed ≥ 4.5:1 on
   its ground in every palette and every tone; `--color-accent-fill` holds the
   literal `#50C878` for fills only. This is the single most important thing in
   the codebase — see trap 1.

2. **Three palettes, swapped with one attribute.** `data-palette` on `<html>`
   in `app/layout.tsx`. Absent = Altura (dark, the default). Also `antigua`
   (warm cream) and `huehue` (espresso). Compare at `/preview`.

3. **English only. No i18n.** US buyers. This is a deliberate simplification
   against the sibling sites — there is no locale store, no
   `useSyncExternalStore`, no hydration guard. Most sections are therefore
   server components; only `lead-form.tsx` is `"use client"`.

4. **`/api/lead` actually sends.** In both siblings this route validated a lead
   and dropped it behind a "TODO: CRM wiring" comment. Here it completes, which
   is why the honeypot and rate limit exist.

5. **Hand-rolled `useState` + zod, no react-hook-form.** A ten-field form does
   not justify the dependency, and the siblings set the precedent.

6. **Unconfirmed facts render as loud `TODO_CONFIRM` badges**, never as
   plausible guesses. A wrong MOQ or a wrong lot altitude in front of a café
   buyer costs more credibility than the whole page earns.

7. **No stock photography.** There are no farm photos yet, and a stock photo of
   somebody else's farm on a traceability page is the exact opposite of the
   pitch. The oversized logo mark carries the hero instead.

---

## Traps — read before editing

1. **An opacity modifier changes a contrast ratio.** `text-accent/70` is not
   `text-accent`; it composites against whatever is behind it and must be
   re-measured. Chroma Group shipped a `/70` that quietly landed at 2.72:1.
   The audit script that caught this is in the session transcript — it walks
   every text node, composites alpha, and computes the real ratio.

2. **Resend domain verification is a launch blocker, not a polish item.** The
   `from:` address must be on a domain verified in Resend. Until
   myguatemalancoffee.com's DNS is verified you can only use
   `onboarding@resend.dev`, **and that delivers solely to the Resend account
   owner's own address** — it is a smoke test, not a working inbox. Start the
   DNS records early.

3. **The mailto fallback is load-bearing.** On a 502 the form hands the visitor
   a prefilled `mailto` built by the *same* composer the server would have
   used. Delete it and a failed send becomes a silently lost lead while the
   visitor walks away believing they got in touch. Keep it when a CRM lands.

4. **`transform` in CSS replaces an SVG `transform` attribute, it does not
   compose with it.** The hero mark originally animated the paths directly,
   which threw away every `rotate()` and stacked all eight petals into one.
   The rotation now lives on a wrapping `<g>` and only the path scales. If you
   animate an SVG element that also carries a transform attribute, expect this.

5. **Never put a `ch` measure on a wrapper element.** `ch` resolves against the
   element's *own* font-size, so `max-w-[20ch]` on a div wrapping a 72px
   headline is measured in body text and crushes it to one word per line. The
   measure goes on the heading itself. This shipped twice during Therafix.

6. **The noindex guard is in two places and both must come off together.**
   `app/robots.ts` and the `robots` block in `app/layout.tsx`. Removing one and
   leaving the other still hides the site.

7. **The rate limiter is in-memory and per-instance.** It resets on cold start
   and does not coordinate across serverless instances. That is the right trade
   for stopping naive abuse at zero cost, but it is a floor, not a ceiling — if
   this gets targeted, Turnstile or hCaptcha goes in front of the submit.

8. **Region counts in prose are derived, not typed.** `lib/copy.ts` computes
   "five of the eight" from `REGIONS`, so editing `regions.ts` moves every
   sentence quoting a count. Do not hardcode one back in.

9. `AGENTS.md` / `CLAUDE.md` are regenerated by `next dev`. Commit them rather
   than fighting them.

10. **Vercel Hobby is non-commercial.** A live commercial site needs Pro.

---

## Launch checklist: the TODO_CONFIRM ledger

**29 placeholders**, all rendering as visible badges. Every one blocks launch.
Grep `pending(` in `lib/copy.ts`.

### Product / lot — `lib/products.ts` and `lib/copy.ts`
- [ ] Lot **altitude in metres** for both single origins, and whether each
      clears the 1,350 m SHB line. This is the number the whole altitude
      argument cashes out into.
- [ ] **Anacafé region** for each lot. Zacapa *reads as* New Oriente and Pueblo
      Nuevo Viñas sits near the Fraijanes Plateau edge, but both are inferences
      from the department. Publishing the wrong region is exactly the error a
      knowledgeable buyer catches.
- [ ] Producer / finca name for each lot, and whether "Santa Rosalía de Mármol"
      is the farm, the community or the mill.
- [ ] Process, varietal and roast level for all three coffees.
- [ ] Whether the blend ships espresso- and filter-profiled versions.

### Commercial — `lib/copy.ts` → `cafes.rows` and `faq.items`
- [ ] MOQ · bag sizes · price per lb and volume breaks · lead time · freight
      terms and any free-freight threshold.
- [ ] **Real door-to-door transit window in days.** The page promises to
      publish it; that promise is the trust play.
- [ ] Bag construction and one-way valve.
- [ ] Decaf availability · retail bags and private label · territory
      exclusivity.
- [ ] Certifications, or none. "None" is a fine answer; an invented one is not.

### Compliance — `lib/copy.ts` → the customs FAQ
- [ ] Importer of record, FDA Food Facility Registration, Prior Notice, FSVP.
      A serious wholesale buyer will ask who carries this.

### Contact — `lib/site.ts`
- [ ] Real enquiry inbox (currently `hello@myguatemalancoffee.com`, unverified).
- [ ] Phone, or leave `phoneE164` empty — the footer hides it when blank, which
      is better than a placeholder number.
- [ ] Confirm the roasting city.

### Verify rather than confirm
- [ ] **Re-read the eight regions' altitude bands off anacafe.org.** The figures
      in `lib/regions.ts` are the commonly published ones and were good enough
      to design against; they have not been checked against the source.

---

## Two open decisions

1. **The sample-box economics.** The CTA deliberately says "samples **and
   pricing**", never "free sample box", because samples shipped from Guatemala
   carry real freight and customs cost and an open web form invites
   tyre-kickers. Decide: free (qualified by the form's volume question), paid,
   or free above a volume threshold. It is a one-line change in
   `lib/copy.ts` → `form.submit`.

2. **Mark and palette.** Both still unchosen. `/preview` renders all three
   marks at hero / header / 24px / one-colour, and all three palettes as real
   page furniture with their measured ratios. Switch with `ACTIVE_MARK` in
   `components/logo.tsx` and `data-palette` in `app/layout.tsx`, then delete
   `app/preview/`.

---

## Where to start next

1. Open `/preview`, pick a mark and a palette, apply both, delete the route.
2. Get the commercial numbers from the business and clear the ledger above.
   The page is structurally finished; it is the facts that are missing.
3. Set up Resend: verify the domain, then set `RESEND_API_KEY`,
   `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL` (see `.env.example`). **Send one real
   test lead and confirm it arrives with a working reply-to** — this has never
   been done.
4. Deploy to Vercel, set the same env vars plus `NEXT_PUBLIC_SITE_URL`.
5. Add an OG image. There is none, so social shares currently render bare.
6. Last: remove **both** halves of the noindex guard, in one commit.

---

## Environment

- `.env*` is gitignored. `.env.example` documents all four variables.
- No Vercel project linked yet; no `vercel.json` (the siblings deploy via pure
  Git integration and so should this).
- `gh` CLI lives at `C:\Program Files\GitHub CLI\gh.exe`, not on PATH in
  pre-existing shells.
- In Git Bash, `vercel api /v9/...` fails because MSYS rewrites the leading
  slash — use PowerShell for those.
