import { copy } from "@/lib/copy";
import { REGIONS, SHB_METRES } from "@/lib/regions";
import { Lede, Section, SectionHeading, SectionLabel, cx } from "./ui";

/**
 * The eight regions, as a real <table>. It is tabular data — region, altitude
 * band, character — and a grid of divs would lose the row/column relationships
 * a screen reader uses to read it back.
 *
 * Below `sm` the table switches to stacked cards via CSS rather than being
 * duplicated in the markup, so there is only ever one copy of the content.
 */
export function Regions() {
  return (
    <Section id="regions">
      <SectionLabel>{copy.regions.label}</SectionLabel>
      <SectionHeading>{copy.regions.heading}</SectionHeading>
      <Lede>{copy.regions.lede}</Lede>

      <div className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <caption className="sr-only">
            {copy.regions.heading} {copy.regions.lede}
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className={thCx}>
                {copy.regions.columns.region}
              </th>
              <th scope="col" className={cx(thCx, "whitespace-nowrap")}>
                {copy.regions.columns.altitude}
              </th>
              <th scope="col" className={thCx}>
                {copy.regions.columns.character}
              </th>
            </tr>
          </thead>
          <tbody>
            {REGIONS.map((r) => {
              const item = copy.regions.items[r.id];
              const fullySHB = r.altMin >= SHB_METRES;

              return (
                <tr key={r.id} className="border-b border-line/70 align-top last:border-0">
                  <th scope="row" className="py-5 pr-6 font-normal">
                    <span className="block font-display text-base font-semibold text-heading">
                      {item.name}
                    </span>
                    <span className="mt-1.5 block text-xs uppercase tracking-[0.12em] text-muted">
                      {copy.regions.soil[r.soil]}
                    </span>
                  </th>

                  <td className="whitespace-nowrap py-5 pr-6">
                    <span className="nums block text-base font-semibold text-heading">
                      {r.altMin.toLocaleString("en-US")}–{r.altMax.toLocaleString("en-US")} m
                    </span>
                    {/* The SHB relationship is the point of the column, so it
                        is stated per row rather than left to the reader to
                        work out against a number in the lede. */}
                    <span
                      className={cx(
                        "mt-1.5 block text-xs",
                        fullySHB ? "font-semibold text-accent" : "text-muted",
                      )}
                    >
                      {fullySHB ? copy.regions.shbFull : copy.regions.shbPartial}
                    </span>
                  </td>

                  <td className="max-w-[34ch] py-5 text-sm leading-relaxed text-muted">
                    {item.character}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-6 max-w-[62ch] text-xs leading-relaxed text-muted">
        {copy.regions.footnote}
      </p>
    </Section>
  );
}

const thCx = "py-3 pr-6 text-xs font-semibold uppercase tracking-[0.14em] text-muted";
