import type { Metadata } from "next";
import { MARKS, Mark, Wordmark, type MarkId } from "@/components/logo";
import { copy } from "@/lib/copy";
import { cx } from "@/components/ui";

/**
 * The decision page. Not part of the site — a workbench for choosing the mark
 * and the palette by looking at them rather than at hex codes.
 *
 * Delete this route once both are chosen. It is excluded from search by the
 * site-wide noindex guard in app/layout.tsx, so it is safe until then.
 */
export const metadata: Metadata = {
  title: "Logo & palette preview",
};

type PaletteId = "altura" | "antigua" | "huehue";

const PALETTES: {
  id: PaletteId;
  attr: string | undefined;
  name: string;
  note: string;
  /* Ratios computed with the WCAG 2.1 formula during the build session.
     Re-verify against the RENDERED page before launch, and re-measure
     anything that picks up an opacity modifier. */
  ratios: { pair: string; value: string; verdict: string }[];
}[] = [
  {
    id: "altura",
    attr: undefined,
    name: "1 · Altura",
    note: "Dark, green-shifted near-black. The only palette where #50C878 is usable at full strength as given — it is the brand colour AND the text accent, with no restrictions anywhere.",
    ratios: [
      { pair: "#50C878 on #0C1311", value: "8.84:1", verdict: "AAA" },
      { pair: "#FFFFFF on #0C1311", value: "18.80:1", verdict: "AAA" },
      { pair: "#A8B3AE on #0C1311", value: "8.71:1", verdict: "AAA" },
      { pair: "#0C1311 on #50C878", value: "8.84:1", verdict: "AAA" },
    ],
  },
  {
    id: "antigua",
    attr: "antigua",
    name: "2 · Antigua",
    note: "Warm cream and espresso, food-magazine editorial. Costs you the brand colour as text entirely — #50C878 is 1.97:1 on cream, so the accent darkens to #0E7A45 and #50C878 survives as a fill only.",
    ratios: [
      { pair: "#1A1F1C on #FAF6EF", value: "15.51:1", verdict: "AAA" },
      { pair: "#0E7A45 on #FAF6EF", value: "5.01:1", verdict: "AA" },
      { pair: "#50C878 on #FAF6EF", value: "1.97:1", verdict: "FAIL — fill only" },
      { pair: "#5A6560 on #FAF6EF", value: "5.63:1", verdict: "AA" },
    ],
  },
  {
    id: "huehue",
    attr: "huehue",
    name: "3 · Huehue",
    note: "Deep espresso surfaces. Warm like the product, and still keeps #50C878 at full strength — 7.65:1 on espresso. The middle path between the other two.",
    ratios: [
      { pair: "#F5F1EA on #2B1D16", value: "16.28:1", verdict: "AAA" },
      { pair: "#50C878 on #2B1D16", value: "7.65:1", verdict: "AAA" },
      { pair: "#C4B5A8 on #2B1D16", value: "8.0:1", verdict: "AAA" },
      { pair: "#2B1D16 on #50C878", value: "7.65:1", verdict: "AAA" },
    ],
  },
];

export default function PreviewPage() {
  return (
    <main className="px-(--space-gutter) py-16">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="font-display text-4xl font-semibold text-heading">Logo &amp; palette</h1>
        <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-muted">
          Pick one mark and one palette. Switch the mark with{" "}
          <code className="text-accent">ACTIVE_MARK</code> in{" "}
          <code className="text-accent">components/logo.tsx</code>, and the palette with{" "}
          <code className="text-accent">data-palette</code> on the{" "}
          <code className="text-accent">&lt;html&gt;</code> element in{" "}
          <code className="text-accent">app/layout.tsx</code>. Then delete this route.
        </p>

        {/* ---------------------------------------------------------- logos */}
        <h2 className="mt-20 border-b border-line pb-4 font-display text-2xl font-semibold text-heading">
          Three marks
        </h2>

        <div className="mt-10 grid gap-10">
          {MARKS.map((m) => (
            <section key={m.id} className="rounded-2xl border border-line bg-surface p-8">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="font-display text-xl font-semibold text-heading">{m.name}</h3>
                <code className="text-xs text-muted">{m.id}</code>
              </div>
              <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-muted">{m.idea}</p>

              <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                <Cell label="Hero — 96px">
                  <Mark
                    variant={m.id}
                    uid={`${m.id}-hero`}
                    showRingText
                    className="h-24 w-24 text-accent"
                  />
                </Cell>

                <Cell label="Header lockup">
                  <Lockup variant={m.id} />
                </Cell>

                <Cell label="Favicon — 24px">
                  <Mark variant={m.id} uid={`${m.id}-fav`} className="h-6 w-6 text-accent" />
                </Cell>

                {/* Does it survive a sack stencil, an invoice, a fax? */}
                <Cell label="One colour">
                  <Mark
                    variant={m.id}
                    uid={`${m.id}-mono`}
                    className="h-16 w-16 text-heading"
                  />
                </Cell>
              </div>
            </section>
          ))}
        </div>

        {/* ------------------------------------------------------- palettes */}
        <h2 className="mt-24 border-b border-line pb-4 font-display text-2xl font-semibold text-heading">
          Three palettes
        </h2>
        <p className="mt-4 max-w-[64ch] text-sm leading-relaxed text-muted">
          Each block below is the real token set, rendering real page furniture.
          Ratios were computed with the WCAG 2.1 formula, not estimated.
        </p>

        <div className="mt-10 grid gap-10">
          {PALETTES.map((p) => (
            <section
              key={p.id}
              data-palette={p.attr}
              className="overflow-hidden rounded-2xl border border-line bg-bg text-text"
            >
              <div className="border-b border-line px-8 py-6">
                <h3 className="font-display text-xl font-semibold text-heading">{p.name}</h3>
                <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-muted">{p.note}</p>
              </div>

              {/* A miniature of the real hero, so the palette is judged doing
                  the job it will actually have to do. */}
              <div className="px-8 py-10">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-accent">
                  {copy.hero.label}
                </p>
                <p className="mt-4 max-w-[18ch] font-display text-3xl font-semibold leading-[1.05] text-heading">
                  {copy.hero.headline}
                </p>
                <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-text">
                  {copy.origin.kicker}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="rounded-full bg-accent-fill px-6 py-3 text-sm font-semibold text-on-accent">
                    {copy.hero.cta}
                  </span>
                  <span className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-heading">
                    {copy.hero.ctaSecondary}
                  </span>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {SWATCHES.map((s) => (
                    <div key={s.token} className="w-28">
                      <div
                        className={cx("h-12 rounded-lg border border-line", s.className)}
                        aria-hidden="true"
                      />
                      <p className="mt-1.5 text-[0.625rem] leading-tight text-muted">{s.token}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* The inverted tone, which every palette has to support. */}
              <div data-tone="invert" className="border-t border-line px-8 py-8">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-accent">
                  data-tone=&quot;invert&quot;
                </p>
                <p className="mt-3 max-w-[46ch] font-display text-xl font-semibold text-heading">
                  {copy.roasting.heading}
                </p>
                <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-text">
                  Every token is redefined in here, so an accent stays contrast-safe
                  on the opposing ground without any component knowing about it.
                </p>
              </div>

              <table className="w-full border-t border-line text-left text-xs">
                <thead>
                  <tr className="text-muted">
                    <th className="px-8 py-3 font-semibold uppercase tracking-[0.12em]">Pair</th>
                    <th className="py-3 font-semibold uppercase tracking-[0.12em]">Ratio</th>
                    <th className="py-3 pr-8 font-semibold uppercase tracking-[0.12em]">Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {p.ratios.map((r) => (
                    <tr key={r.pair} className="border-t border-line/60">
                      <td className="px-8 py-2.5 font-mono text-heading">{r.pair}</td>
                      <td className="nums py-2.5 text-heading">{r.value}</td>
                      <td
                        className={cx(
                          "py-2.5 pr-8 font-semibold",
                          r.verdict.startsWith("FAIL") ? "text-warm" : "text-accent",
                        )}
                      >
                        {r.verdict}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

const SWATCHES = [
  { token: "--color-bg", className: "bg-bg" },
  { token: "--color-surface", className: "bg-surface" },
  { token: "--color-line", className: "bg-line" },
  { token: "--color-accent", className: "bg-accent" },
  { token: "--color-accent-fill", className: "bg-accent-fill" },
  { token: "--color-warm", className: "bg-warm" },
  { token: "--color-muted", className: "bg-muted" },
];

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-[10rem] flex-col items-center justify-center gap-4 bg-bg p-6">
      <div className="flex flex-1 items-center">{children}</div>
      <p className="text-[0.625rem] uppercase tracking-[0.12em] text-muted">{label}</p>
    </div>
  );
}

function Lockup({ variant }: { variant: MarkId }) {
  const stacked = variant === "cota";
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2.5 text-accent",
        stacked && "flex-col gap-1.5",
      )}
    >
      <Mark variant={variant} uid={`${variant}-lock`} className="h-9 w-9 shrink-0" />
      <Wordmark variant={variant} className="text-base" />
    </span>
  );
}
