import { z } from "zod";
import { PRODUCT_IDS } from "./products";

/**
 * Shared by the client form and the /api/lead route handler, so the browser
 * and the server can never disagree about what a valid lead is. The server
 * re-validates with this same schema — a client-side check is a courtesy to
 * the visitor, never a security boundary.
 *
 * Messages are KEYS, not sentences. The form looks each one up in copy.ts.
 * That is not about translation here (the site is English-only); it is because
 * copy.ts is the single place reader-facing words are allowed to live, and an
 * error message is reader-facing words.
 *
 * `products` is typed from PRODUCT_IDS, so the checkboxes the form renders and
 * the values this schema accepts cannot drift apart — adding a fourth coffee
 * to products.ts updates both at once.
 */

export const LOCATION_BANDS = ["1", "2-3", "4-10", "10+"] as const;
export const VOLUME_BANDS = ["under-20", "20-50", "50-150", "150-plus", "unsure"] as const;

/** Above this, the enquiry is a contract conversation, not a sample box. */
export const MULTI_LOCATION_BAND = "10+";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "nameShort").max(80, "tooLong"),

  cafe: z.string().trim().min(2, "required").max(80, "tooLong"),

  email: z.string().trim().email("emailInvalid").max(120, "tooLong"),

  phone: z.string().trim().max(40, "tooLong").optional().or(z.literal("")),

  /* Free text rather than a state dropdown: a dropdown of 50 states on a phone
     is worse than typing "Portland, OR", and this only ever has to be good
     enough for a human to quote freight against. */
  city: z.string().trim().min(3, "cityShort").max(80, "tooLong"),

  locations: z.enum(LOCATION_BANDS, { message: "required" }),

  volume: z.enum(VOLUME_BANDS, { message: "required" }),

  products: z.array(z.enum(PRODUCT_IDS)).min(1, "productsEmpty"),

  message: z.string().trim().max(1000, "tooLong").optional().or(z.literal("")),

  /* HONEYPOT. Hidden from sighted users and from assistive technology, and
     skipped in the tab order. A human never fills it; a naive bot fills every
     field it finds. Non-empty means the submission is dropped — with a 200, so
     the bot learns nothing from the response. */
  website: z.string().max(200).optional().or(z.literal("")),
});

export type Lead = z.infer<typeof leadSchema>;

export const emptyLead: Lead = {
  name: "",
  cafe: "",
  email: "",
  phone: "",
  city: "",
  locations: "1",
  volume: "unsure",
  products: [],
  message: "",
  website: "",
};

/** Field-name -> message-key map, the shape the form renders errors from. */
export type LeadErrors = Partial<Record<keyof Lead, string>>;

export function collectErrors(err: z.ZodError<Lead>): LeadErrors {
  const out: LeadErrors = {};
  for (const issue of err.issues) {
    const key = issue.path[0] as keyof Lead | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

export function isMultiLocation(lead: Pick<Lead, "locations">): boolean {
  return lead.locations === MULTI_LOCATION_BAND;
}
