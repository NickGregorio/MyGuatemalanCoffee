import { copy } from "@/lib/copy";
import { Section, SectionHeading, SectionLabel, MaybePending } from "./ui";

/**
 * The freshness section — structurally the weakest part of this pitch and
 * therefore the most important one to get right.
 *
 * Roasting at origin and shipping to the US means transit days a domestic
 * roaster does not have, and a café buyer will spot a dodge instantly. The
 * copy names the trade out loud instead of burying it. Being the only page in
 * the category that publishes its transit time is itself the trust play — so
 * do not "improve" this section by softening it.
 *
 * Inverted tone: this is the one section that flips to the palette's opposing
 * ground, so the page's most important argument reads as a deliberate stop
 * rather than more of the same scroll.
 */
export function RoastedAtOrigin() {
  return (
    <Section id="roasting" tone="invert">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-20">
        <div>
          <SectionLabel>{copy.roasting.label}</SectionLabel>
          <SectionHeading>{copy.roasting.heading}</SectionHeading>
          <p className="mt-6 max-w-[58ch] text-base leading-[1.7] text-text">
            {copy.roasting.body}
          </p>
          <p className="mt-5 max-w-[58ch] text-base leading-[1.7] text-text">
            {copy.roasting.body2}
          </p>
        </div>

        <ul className="grid content-start gap-px overflow-hidden rounded-2xl border border-line bg-line">
          {copy.roasting.items.map((item) => (
            <li key={item.title} className="bg-surface px-6 py-6">
              <h3 className="font-display text-base font-semibold text-heading">{item.title}</h3>
              <div className="mt-2.5 text-sm leading-relaxed text-muted">
                <MaybePending value={item.body} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
