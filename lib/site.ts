/**
 * Single source of truth for how to reach MyGuatemalanCoffee.com.
 *
 * Nothing else in this codebase may hardcode an email address, a phone number
 * or a social URL. Import from here.
 *
 * ⚠️ EVERY VALUE BELOW IS A PLACEHOLDER. None of it has been confirmed with
 * the business. It is wired up so the site is structurally complete, and it is
 * on the launch checklist in HANDOFF.md. Shipping a wrong email address is
 * worse than shipping none, because a lead that bounces looks like a lead that
 * was ignored.
 */
export const SITE = {
  name: "MyGuatemalanCoffee.com",
  /** Short form, for places the full domain-as-brand is too long to set. */
  shortName: "MyGuatemalanCoffee",
  domain: "myguatemalancoffee.com",

  /** TODO_CONFIRM — the real inbox that wholesale enquiries should land in. */
  email: "hello@myguatemalancoffee.com",
  /** TODO_CONFIRM — E.164, digits only. Leave empty to hide phone everywhere. */
  phoneE164: "",
  /** TODO_CONFIRM — human-readable, as the business writes it. */
  phoneDisplay: "",

  /** TODO_CONFIRM — where the coffee is roasted, for the origin claim. */
  roastCity: "Guatemala City",
  country: "Guatemala",
  countryCode: "GT",

  /** TODO_CONFIRM — drop any that do not exist rather than linking a dead page. */
  instagram: "",
} as const;

export const mailtoUrl = `mailto:${SITE.email}`;
export const telUrl = SITE.phoneE164 ? `tel:+${SITE.phoneE164}` : "";

/** The page has exactly one destination. Every CTA points here. */
export const CTA_TARGET = "#samples";

/**
 * Prefilled mailto, used as the form's fallback when the Resend send fails.
 *
 * This is load-bearing, not decoration: without it a failed send is a lost
 * lead and the visitor never finds out. Same role Chroma Group's prefilled
 * WhatsApp link plays. Do not delete it when a CRM lands.
 */
export function mailtoWithBody(subject: string, body: string): string {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
