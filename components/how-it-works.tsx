import { copy } from "@/lib/copy";
import { Section, SectionHeading, SectionLabel } from "./ui";

/**
 * Four steps. This section exists to kill one specific objection — "changing
 * or adding a coffee supplier is going to be a project" — so it stays short
 * and every step is something the reader does, not something we do.
 */
export function HowItWorks() {
  return (
    <Section id="how">
      <SectionLabel>{copy.how.label}</SectionLabel>
      <SectionHeading>{copy.how.heading}</SectionHeading>

      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {copy.how.steps.map((step, i) => (
          <li key={step.title} className="relative pt-7">
            {/* The rule doubles as the step counter's baseline. */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-px w-full bg-line"
            />
            <span className="nums absolute -top-3 left-0 bg-bg pr-3 font-display text-sm font-bold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>

            <h3 className="font-display text-lg font-semibold leading-snug text-heading">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
