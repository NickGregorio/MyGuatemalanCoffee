import { copy } from "./copy";
import { isMultiLocation, type Lead } from "./lead";
import { SITE } from "./site";

/**
 * Turns a validated lead into the subject line and plain-text body of the
 * notification email.
 *
 * Deliberately shared between the server (which sends it through Resend) and
 * the client (which uses the SAME text to build the prefilled mailto fallback
 * when a send fails). One composer means the fallback email and the real one
 * can never say different things.
 *
 * Plain text, not HTML: this is an internal notification that gets read on a
 * phone and replied to. HTML would add nothing and cost deliverability.
 */

const LOCATIONS = copy.form.locations;
const VOLUMES = copy.form.volume;
const PRODUCT_NAMES = copy.line.items;

export function composeLeadSubject(lead: Lead): string {
  /* Café name and size go in the subject so the inbox list is triageable
     without opening anything. */
  const size = LOCATIONS[lead.locations];
  const flag = isMultiLocation(lead) ? "MULTI-LOCATION — " : "";
  return `${flag}${lead.cafe} (${size}) — ${copy.form.fallbackSubject}`;
}

export function composeLeadText(lead: Lead): string {
  const picked = lead.products.map((id) => `  - ${PRODUCT_NAMES[id].name}`).join("\n");

  const lines = [
    `New wholesale enquiry from ${SITE.domain}`,
    "",
    `Café:       ${lead.cafe}`,
    `Contact:    ${lead.name}`,
    `Email:      ${lead.email}`,
  ];

  if (lead.phone) lines.push(`Phone:      ${lead.phone}`);

  lines.push(
    `Location:   ${lead.city}`,
    `Locations:  ${LOCATIONS[lead.locations]}`,
    `Volume:     ${VOLUMES[lead.volume]}/month`,
    "",
    "Wants to try:",
    picked,
  );

  if (lead.message) {
    lines.push("", "Message:", lead.message);
  }

  if (isMultiLocation(lead)) {
    lines.push(
      "",
      "--",
      "Flagged multi-location: this one wants consistency across bars and a",
      "contract price, not a first sample box. Start there.",
    );
  }

  return lines.join("\n");
}
