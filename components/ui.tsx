import type { ReactNode } from "react";
import { PENDING_PREFIX } from "@/lib/copy";

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/**
 * A page section.
 *
 * `tone="invert"` flips the section to the palette's opposing ground — light
 * on a dark palette, dark on a light one. It works by setting data-tone, which
 * app/globals.css uses to redefine EVERY colour token inside the element, so
 * `text-accent` and friends stay contrast-safe in there without any component
 * knowing which palette is active. See the contrast rule at the top of
 * globals.css.
 */
export function Section({
  id,
  children,
  className,
  tone = "default",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "raised" | "invert";
}) {
  return (
    <section
      id={id}
      data-tone={tone === "invert" ? "invert" : undefined}
      className={cx(
        "px-(--space-gutter) py-(--space-section)",
        tone === "raised" && "bg-surface",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

/**
 * The site's one recurring ornament: an altitude contour, which is the idea
 * the whole page rests on. Decorative, so hidden from assistive technology.
 */
export function ContourMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cx("h-3.5 w-3.5 shrink-0", className)}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1.5 12.5 8 4l6.5 8.5" strokeWidth="1.4" />
      <path d="M4.5 12.5 8 8l3.5 4.5" strokeWidth="1.4" opacity="0.5" />
    </svg>
  );
}

/**
 * Small-caps label above each section heading.
 *
 * Uses `text-accent`, which globals.css guarantees is >= 4.5:1 on every ground
 * in every palette — the brand green itself (--color-accent-fill) would be
 * 1.97:1 on a cream palette and is never allowed on text this size.
 */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-accent">
      <ContourMark />
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  /* The measure goes on the heading itself, never on a wrapping element: `ch`
     resolves against the element's OWN font-size, so a max-w-[22ch] on a
     wrapper div is measured in body text and crushes a display heading to one
     word per line. This shipped twice during the Therafix build. */
  return (
    <Tag
      className={cx(
        "mt-5 max-w-[20ch] font-display text-(length:--text-section) font-semibold leading-[1.1] tracking-[-0.015em] text-heading text-balance",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Lede({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("mt-5 max-w-[62ch] text-base leading-[1.65] text-text", className)}>
      {children}
    </p>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-200";
  /* bg-accent-fill is the literal brand #50C878. It is a FILL here, with
     --color-on-accent sitting on top of it — measured 8.84:1 on the dark
     palettes, 8.84:1 on light too since on-accent stays near-black. */
  const styles =
    variant === "primary"
      ? "bg-accent-fill text-on-accent hover:brightness-110"
      : "border border-line bg-transparent text-heading hover:border-accent hover:text-accent";

  return (
    <a
      href={href}
      className={cx(base, styles, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

/**
 * A fact the business has not confirmed yet.
 *
 * This is LOUD ON PURPOSE. The alternative — a plausible-looking guess — is
 * how a wrong MOQ or a wrong lot altitude reaches a café buyer, and a wrong
 * number costs more credibility than the whole page earns. Everything wearing
 * this badge is a launch blocker listed in HANDOFF.md.
 *
 * Pass a string built by `pending()` in lib/copy.ts; the prefix is stripped for
 * display and shown as the badge instead.
 */
export function Pending({ children }: { children: string }) {
  const text = children.startsWith(`${PENDING_PREFIX}: `)
    ? children.slice(PENDING_PREFIX.length + 2)
    : children;

  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded border border-dashed border-warm/60 bg-warm/10 px-2 py-1 text-warm">
      <span className="text-[0.625rem] font-bold uppercase tracking-[0.14em]">
        {PENDING_PREFIX}
      </span>
      <span className="text-sm italic">{text}</span>
    </span>
  );
}

/** True when a copy string is an unconfirmed placeholder. */
export function isPending(value: string): boolean {
  return value.startsWith(`${PENDING_PREFIX}: `);
}

/** Renders a copy string as prose, or as a Pending badge if it is a placeholder. */
export function MaybePending({ value, className }: { value: string; className?: string }) {
  if (isPending(value)) return <Pending>{value}</Pending>;
  return <span className={className}>{value}</span>;
}
