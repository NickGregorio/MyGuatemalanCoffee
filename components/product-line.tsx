import { copy } from "@/lib/copy";
import { PRODUCTS } from "@/lib/products";
import { Lede, MaybePending, Section, SectionHeading, SectionLabel, cx } from "./ui";

/**
 * The three coffees. This is the section that carries the actual pitch: a
 * blend to pour all day plus two rotating single origins is a complete bar
 * program, and a café gets it by opening one account rather than three.
 */
export function ProductLine() {
  const L = copy.line.specLabels;

  return (
    <Section id="line" tone="raised" className="border-y border-line">
      <SectionLabel>{copy.line.label}</SectionLabel>
      <SectionHeading>{copy.line.heading}</SectionHeading>
      <Lede>{copy.line.lede}</Lede>

      <ul className="mt-12 grid gap-6 lg:grid-cols-3">
        {PRODUCTS.map((p) => {
          const item = copy.line.items[p.id];
          const isBlend = p.kind === "blend";

          return (
            <li
              key={p.id}
              className={cx(
                "flex flex-col rounded-2xl border bg-bg p-7",
                /* The blend is the volume coffee and the entry point, so it
                   carries the accent border. Not louder — just first. */
                isBlend ? "border-accent-fill/50" : "border-line",
              )}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {item.role}
              </span>

              <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-heading">
                {item.name}
              </h3>
              <p className="mt-1.5 text-sm text-muted">{item.sub}</p>

              <p className="mt-5 flex-1 text-sm leading-relaxed text-text">{item.body}</p>

              <dl className="mt-7 grid gap-3 border-t border-line pt-6 text-sm">
                {/* Always rendered, so the spec rows line up across all three
                    cards. The blend has no single department, which is the
                    whole point of it — so it says so rather than leaving a gap
                    that knocks the rows out of alignment. */}
                <Spec label={L.department}>
                  <span className="text-heading">{p.department ?? copy.line.allRegions}</span>
                </Spec>

                <Spec label={L.altitude}>
                  {p.altM ? (
                    <span className="nums text-heading">{p.altM.toLocaleString("en-US")} m</span>
                  ) : (
                    <MaybePending value={copy.lots.altitudePending} />
                  )}
                </Spec>

                <Spec label={L.process}>
                  <MaybePending value={item.process} />
                </Spec>
                <Spec label={L.varietal}>
                  <MaybePending value={item.varietal} />
                </Spec>
                <Spec label={L.roast}>
                  <MaybePending value={item.roast} />
                </Spec>
              </dl>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

function Spec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-baseline gap-3">
      <dt className="text-xs uppercase tracking-[0.12em] text-muted">{label}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}
