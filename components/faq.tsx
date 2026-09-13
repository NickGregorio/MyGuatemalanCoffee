import { copy } from "@/lib/copy";
import { MaybePending, Section, SectionHeading, SectionLabel } from "./ui";

/**
 * Objection handling.
 *
 * Built on native <details>/<summary>, so it is a server component with zero
 * JavaScript: keyboard operable, announced correctly, and findable by the
 * browser's own in-page search even while collapsed. A hand-rolled accordion
 * would cost a client bundle and buy nothing.
 *
 * The first answer is the one that matters — "we already work with a roaster"
 * is what most readers are thinking — and it concedes the point rather than
 * arguing with it. Read the copy rules in lib/copy.ts before rewriting it.
 */
export function Faq() {
  return (
    <Section id="faq">
      <SectionLabel>{copy.faq.label}</SectionLabel>
      <SectionHeading>{copy.faq.heading}</SectionHeading>

      <div className="mt-12 divide-y divide-line border-y border-line">
        {copy.faq.items.map((item) => (
          <details key={item.q} className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-base font-semibold leading-snug text-heading sm:text-lg">
                {item.q}
              </h3>
              {/* Decorative: the disclosure state is already conveyed by
                  <details> itself, which is what assistive tech reads. */}
              <span
                aria-hidden="true"
                className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line text-accent transition-transform duration-200 group-open:rotate-45"
              >
                <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 1.5v9M1.5 6h9" />
                </svg>
              </span>
            </summary>
            <div className="max-w-[68ch] pb-6 pr-10 text-sm leading-relaxed text-muted">
              <MaybePending value={item.a} />
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
