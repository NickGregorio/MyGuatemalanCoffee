import { copy } from "@/lib/copy";
import { CTA_TARGET } from "@/lib/site";
import { ACTIVE_MARK, Mark } from "./logo";
import { ButtonLink, ContourMark, cx } from "./ui";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-(--space-gutter) pb-(--space-section) pt-14 sm:pt-20">
      {/* A single soft altitude wash behind the headline. Decorative, hidden
          from assistive tech, and low enough in opacity that it never changes
          the contrast of the text sitting on it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[36rem] w-[min(90rem,140%)] -translate-x-1/2 opacity-[0.07]"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 40%, var(--color-accent-fill) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <p className="flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-accent">
          <ContourMark />
          {copy.hero.label}
        </p>

        {/* The measure lives on the h1 itself — see the note in ui.tsx. */}
        <h1 className="mt-6 max-w-[15ch] font-display text-(length:--text-hero) font-semibold leading-[1.02] tracking-[-0.025em] text-heading text-balance">
          {copy.hero.headline}
        </h1>

        <p className="mt-7 max-w-[58ch] text-lg leading-[1.6] text-text">{copy.hero.lede}</p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={CTA_TARGET}>{copy.hero.cta}</ButtonLink>
          <ButtonLink href="#regions" variant="secondary">
            {copy.hero.ctaSecondary}
          </ButtonLink>
        </div>

        {/* Three numbers rather than three adjectives. Each one is checkable. */}
        <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {copy.hero.stats.map((s) => (
            <div key={s.label} className="bg-surface px-6 py-7">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="nums block font-display text-4xl font-semibold text-accent">
                  {s.value}
                </span>
                <span className="mt-2 block text-sm leading-snug text-muted">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* The mark, oversized and cropped, as the page's one piece of imagery.
          There is no photography yet — leaning on the mark is honest, where a
          stock photo of someone else's farm would not be. */}
      <Mark
        variant={ACTIVE_MARK}
        animate
        uid="hero"
        className={cx(
          "pointer-events-none absolute -right-24 top-8 hidden h-[28rem] w-[28rem]",
          "text-accent-fill opacity-[0.06] lg:block",
        )}
      />
    </section>
  );
}
