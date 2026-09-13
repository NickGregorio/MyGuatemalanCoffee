import { copy } from "@/lib/copy";
import { Section, SectionHeading, SectionLabel } from "./ui";

export function OriginCase() {
  return (
    <Section id="why" tone="raised" className="border-y border-line">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
        <div>
          <SectionLabel>{copy.origin.label}</SectionLabel>
          <SectionHeading>{copy.origin.heading}</SectionHeading>
        </div>

        <div>
          <p className="max-w-[62ch] text-base leading-[1.7] text-text">{copy.origin.body}</p>
          <p className="mt-5 max-w-[62ch] border-l-2 border-accent-fill pl-5 font-display text-lg italic leading-snug text-heading">
            {copy.origin.kicker}
          </p>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {copy.origin.points.map((p) => (
              <li key={p.title} className="bg-bg px-6 py-7">
                <h3 className="font-display text-base font-semibold text-heading">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
