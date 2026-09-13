import { copy } from "@/lib/copy";
import { SINGLE_ORIGINS } from "@/lib/products";
import { SITE } from "@/lib/site";
import { Lede, MaybePending, Pending, Section, SectionHeading, SectionLabel } from "./ui";

/**
 * The traceability section — the two single-origin lots in detail.
 *
 * This is where the altitude argument built in the "why Guatemala" section has
 * to cash out into two real numbers. It cannot yet, so it says so loudly
 * rather than rounding a guess into a fact. Everything visible here that is
 * pending is a launch blocker, listed in HANDOFF.md.
 */
export function Lots() {
  return (
    <Section id="lots">
      <SectionLabel>{copy.lots.label}</SectionLabel>
      <SectionHeading>{copy.lots.heading}</SectionHeading>
      <Lede>{copy.lots.lede}</Lede>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {SINGLE_ORIGINS.map((p) => {
          const item = copy.line.items[p.id];

          return (
            <article key={p.id} className="rounded-2xl border border-line bg-surface p-8">
              <h3 className="font-display text-2xl font-semibold leading-tight text-heading">
                {item.name}
              </h3>
              <p className="mt-2 text-sm uppercase tracking-[0.14em] text-accent">
                {p.department}, {SITE.country}
              </p>

              <p className="mt-5 text-sm leading-relaxed text-text">{item.body}</p>

              <dl className="mt-7 space-y-4 border-t border-line pt-6">
                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-muted">
                    {copy.lots.producerLabel}
                  </dt>
                  <dd className="mt-2">
                    <Pending>{copy.lots.producerPending[p.id]}</Pending>
                  </dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-muted">
                    {copy.line.specLabels.region}
                  </dt>
                  <dd className="mt-2">
                    <MaybePending value={copy.lots.regionPending} />
                  </dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-muted">
                    {copy.line.specLabels.altitude}
                  </dt>
                  <dd className="mt-2">
                    <MaybePending value={copy.lots.altitudePending} />
                  </dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>

      <p className="mt-8 max-w-[62ch] text-sm leading-relaxed text-muted">
        {copy.lots.altitudeNote}
      </p>
    </Section>
  );
}
