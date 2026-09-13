import type { Metadata, Viewport } from "next";
import { Fraunces, Archivo } from "next/font/google";
import { copy } from "@/lib/copy";
import { SITE } from "@/lib/site";
import "./globals.css";

/* Fraunces carries the display type — it has agricultural, almost editorial
   warmth without tipping into the woodtype-coffee-sack cliché. Archivo runs
   body copy and the spec tables; its tabular figures keep altitude columns
   aligned. Both self-hosted at build by next/font — no runtime CDN call. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

/* Absolute URLs for OG/Twitter images. Vercel injects
   VERCEL_PROJECT_PRODUCTION_URL at build; localhost is the `next dev`
   fallback. Set NEXT_PUBLIC_SITE_URL once the real domain is live so social
   previews stop pointing at *.vercel.app. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: copy.meta.title,
    template: copy.meta.titleTemplate,
  },
  description: copy.meta.description,
  applicationName: SITE.name,
  keywords: [...copy.meta.keywords],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    title: copy.meta.title,
    description: copy.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: copy.meta.title,
    description: copy.meta.description,
  },

  /* ---------------------------------------------------------------------
     PRE-LAUNCH GUARD — remove together with app/robots.ts

     The site currently ships with unconfirmed commercial terms: no MOQ, no
     pricing, no transit window, no lot altitudes, and no confirmed Anacafé
     region for either single origin. Every one of those renders as a visible
     TODO_CONFIRM badge. Indexing that state would put a half-answered
     wholesale page in front of buyers searching for a supplier, which is
     worse than not being indexed for a few more days.

     IF THIS SURVIVES TO LAUNCH THE SITE IS INVISIBLE TO GOOGLE. Removing it
     is a launch checklist item, not an optional cleanup — and BOTH halves
     must come off in the same commit. Removing one and leaving the other
     still hides the site.
  --------------------------------------------------------------------- */
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0c1311",
  colorScheme: "dark",
};

/**
 * Helps Google associate the business with its real identity the moment the
 * guard above comes off. Kept minimal on purpose: Organization only, with no
 * address, no telephone and no aggregateRating, because none of those are
 * confirmed. Structured data asserting unconfirmed facts is still asserting
 * unconfirmed facts — it is just doing it in a format Google trusts more.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: siteUrl,
  description: copy.meta.description,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.roastCity,
    addressCountry: SITE.countryCode,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    /* data-palette is absent, which means the default ("Altura") is active.
       Set data-palette="antigua" or "huehue" here to switch the whole site —
       see the token blocks in app/globals.css, and compare all three at
       /preview. */
    <html lang="en" className={`${fraunces.variable} ${archivo.variable} h-full`}>
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent-fill focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-on-accent"
        >
          {copy.nav.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
