import { cx } from "./ui";

/**
 * Three logo concepts, all hand-drawn SVG so they stay crisp at any size and
 * can be recoloured by the active palette. No raster logos — same rule as the
 * sibling projects.
 *
 * Each must survive three tests:
 *   1. read at 24px (favicon / browser tab)
 *   2. work in ONE colour (a coffee sack stencil, an invoice, a fax)
 *   3. pair with a wordmark for a name as long as "MyGuatemalanCoffee.com"
 *
 * Switch the site's mark by changing ACTIVE_MARK below. Everything else —
 * header, footer, favicon, OG image — follows from it.
 *
 * Compare all three rendered at real sizes at /preview.
 */

export type MarkId = "ocho" | "cota" | "sello";

/** The mark the live site uses. One edit switches it everywhere. */
export const ACTIVE_MARK: MarkId = "ocho";

export const MARKS: { id: MarkId; name: string; idea: string }[] = [
  {
    id: "ocho",
    name: "Ocho",
    idea: "Eight strokes radiating from a centre — a coffee blossom, a compass rose, a sun. The count is the flagship product: eight regions in one blend. The one mark where the logo and the positioning are the same idea.",
  },
  {
    id: "cota",
    name: "Cota",
    idea: "Topographic contour lines over a volcanic cone, with the summit broken open into a bean crease. Encodes altitude, which is what the entire quality argument rests on. Technical rather than decorative — looks like a document, not an ad.",
  },
  {
    id: "sello",
    name: "Sello",
    idea: "An export seal: microtype ring around a bean glyph, echoing the stencils on a jute sack. The most heritage-importer of the three and the best of them printed on a bag — also the most conventional move in coffee.",
  },
];

/* -------------------------------------------------------------------------- */
/* Ocho                                                                        */
/* -------------------------------------------------------------------------- */

/** One petal, tip at the top, base meeting the centre hub. Rotated 8 times. */
const PETAL =
  "M32 8c3.6 5.6 5.3 10.9 5.3 15.3 0 3.6-1.9 6.3-5.3 7.9-3.4-1.6-5.3-4.3-5.3-7.9C26.7 18.9 28.4 13.6 32 8Z";

export function OchoMark({
  className,
  animate = false,
}: {
  className?: string;
  animate?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cx("h-10 w-10", className)}
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
    >
      {/* The rotation lives on a wrapping <g>, NOT on the path itself.
          A CSS `transform` (which the .ray animation applies) replaces an
          element's SVG transform attribute outright rather than composing with
          it — so animating the path directly threw away every rotation and
          stacked all eight petals on top of each other, rendering as one.
          Splitting them means the group rotates and the path only scales. */}
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i} transform={`rotate(${i * 45} 32 32)`}>
          <path
            d={PETAL}
            /* The stagger is defined in globals.css and runs once on load. */
            className={animate ? `ray ray-${i}` : undefined}
            opacity={i % 2 === 0 ? 1 : 0.72}
          />
        </g>
      ))}
      {/* The hub reads as the centre of a blossom and as a bean end-on. */}
      <circle cx="32" cy="32" r="4.1" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Cota                                                                        */
/* -------------------------------------------------------------------------- */

export function CotaMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cx("h-10 w-10", className)}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Slopes, broken at the summit — the gap is the bean crease. */}
      <path d="M5 51 30.1 17.2" />
      <path d="M33.9 17.2 59 51" />
      {/* Contour lines. Two only: a third disappears at favicon size. */}
      <path d="M17.5 43.5q14.5-4 29 0" opacity="0.62" />
      <path d="M23.5 35q8.5-3 17 0" opacity="0.62" />
      <path d="M5 51h54" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Sello                                                                       */
/* -------------------------------------------------------------------------- */

export function SelloMark({
  className,
  showRingText = false,
  uid = "sello",
}: {
  className?: string;
  /* Microtype vanishes below ~40px, so the favicon variant drops it and keeps
     the rings. Callers rendering more than one Sello must pass distinct `uid`
     values or the textPath references collide. */
  showRingText?: boolean;
  uid?: string;
}) {
  const pathId = `${uid}-ring`;
  return (
    <svg
      viewBox="0 0 64 64"
      className={cx("h-10 w-10", className)}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="32" cy="32" r="30" strokeWidth="2" />
      <circle cx="32" cy="32" r="23.5" strokeWidth="1" opacity="0.6" />

      {showRingText ? (
        <>
          <path
            id={pathId}
            d="M32 32 m-26.6 0 a26.6 26.6 0 1 1 53.2 0 a26.6 26.6 0 1 1 -53.2 0"
            fill="none"
            stroke="none"
          />
          <text
            fill="currentColor"
            stroke="none"
            fontSize="5.4"
            letterSpacing="1.5"
            fontWeight="700"
          >
            <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
              GUATEMALA · SHB · ALTURA
            </textPath>
          </text>
        </>
      ) : null}

      {/* Bean, tilted so the crease reads as a curve rather than a slot. */}
      <g transform="rotate(-22 32 32)">
        <ellipse cx="32" cy="32" rx="7.4" ry="10.8" fill="currentColor" stroke="none" />
        <path
          d="M32 22.6c-3.6 3.4 3.6 15 0 18.8"
          stroke="var(--color-bg)"
          strokeWidth="1.9"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Wordmark lockups                                                            */
/* -------------------------------------------------------------------------- */

/**
 * "MyGuatemalanCoffee.com" is 22 characters — far too long to set in one line
 * next to a mark at header size. Each concept solves it differently, which is
 * part of what you are choosing between.
 */
export function Wordmark({ variant, className }: { variant: MarkId; className?: string }) {
  if (variant === "ocho") {
    /* Two lines, tight leading, so the lockup stays roughly square next to a
       round mark. `.COM` drops to muted so it reads as the suffix it is. */
    return (
      <span className={cx("font-display leading-[0.95] tracking-tight", className)}>
        <span className="block text-[0.78em] font-semibold uppercase tracking-[0.06em] text-heading">
          MyGuatemalan
        </span>
        <span className="block text-[0.78em] font-semibold uppercase tracking-[0.06em] text-heading">
          Coffee<span className="text-muted">.com</span>
        </span>
      </span>
    );
  }

  if (variant === "cota") {
    /* Stacked under the mark, letterspaced wide — the "survey document" read. */
    return (
      <span
        className={cx(
          "block text-center font-display text-[0.6em] font-semibold uppercase leading-tight tracking-[0.22em] text-heading",
          className,
        )}
      >
        MyGuatemalanCoffee<span className="text-muted">.com</span>
      </span>
    );
  }

  /* Sello: inline, weight contrast carrying the three words apart. */
  return (
    <span className={cx("font-display text-[0.85em] leading-none tracking-tight", className)}>
      <span className="font-normal text-heading">My</span>
      <span className="font-bold text-heading">Guatemalan</span>
      <span className="font-normal text-heading">Coffee</span>
      <span className="font-normal text-muted">.com</span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */

export function Mark({
  variant,
  className,
  animate,
  showRingText,
  uid,
}: {
  variant: MarkId;
  className?: string;
  animate?: boolean;
  showRingText?: boolean;
  uid?: string;
}) {
  if (variant === "cota") return <CotaMark className={className} />;
  if (variant === "sello")
    return <SelloMark className={className} showRingText={showRingText} uid={uid} />;
  return <OchoMark className={className} animate={animate} />;
}

/** The full lockup, as used in the header and footer. */
export function Logo({
  variant = ACTIVE_MARK,
  className,
  animate = false,
}: {
  variant?: MarkId;
  className?: string;
  animate?: boolean;
}) {
  const stacked = variant === "cota";

  return (
    <span
      className={cx(
        "inline-flex items-center gap-2.5 text-accent",
        stacked && "flex-col gap-1.5",
        className,
      )}
    >
      <Mark variant={variant} className="h-9 w-9 shrink-0" animate={animate} />
      <Wordmark variant={variant} className="text-base" />
    </span>
  );
}
