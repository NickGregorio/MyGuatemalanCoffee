import { copy } from "@/lib/copy";
import { CTA_TARGET } from "@/lib/site";
import { ButtonLink, Lede, MaybePending, Section, SectionHeading, SectionLabel } from "./ui";

/**
 * The commercial block — minimums, bag sizes, freight, pricing.
 *
 * Most wholesale coffee sites hide all of this behind a quote form. Publishing
 * it is the differentiator, which is also why the pending rows are so visible:
 * a page that promises the commercial detail up front and then shows nothing
 * is worse than one that never promised it.
 *
 * The multi-location callout is the secondary path. Indies lead (they are the
 * larger market and the shorter cycle); a small chain gets pointed at the same
 * form with a different opening line.
 */
export function ForCafes() {
  return (
    <Section id="cafes" tone="raised" className="border-y border-line">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-20">
        <div>
          <SectionLabel>{copy.cafes.label}</SectionLabel>
          <SectionHeading>{copy.cafes.heading}</SectionHeading>
          <Lede>{copy.cafes.lede}</Lede>

          <div className="mt-10 rounded-2xl border border-accent-fill/40 bg-bg p-6">
            <h3 className="font-display text-base font-semibold text-heading">
              {copy.cafes.multiTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{copy.cafes.multiBody}</p>
            <ButtonLink href={CTA_TARGET} variant="secondary" className="mt-5 px-5 py-2.5 text-xs">
              {copy.form.submitMulti}
            </ButtonLink>
          </div>
        </div>

        <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
          {copy.cafes.rows.map((row) => (
            <div
              key={row.term}
              className="grid gap-2 bg-bg px-6 py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6"
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted sm:pt-1">
                {row.term}
              </dt>
              <dd className="min-w-0 text-sm leading-relaxed text-text">
                <MaybePending value={row.detail} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
