import { copy } from "@/lib/copy";
import { CTA_TARGET } from "@/lib/site";
import { Logo } from "./logo";

/**
 * Sticky header. No mobile menu drawer by design: there are five anchors on a
 * single page, and a hamburger that opens a panel to show five in-page links
 * is more machinery than the content justifies. Below `md` the links collapse
 * and the CTA — the page's only real destination — stays.
 */
export function SiteHeader() {
  const links = [
    { href: "#regions", label: copy.nav.regions },
    { href: "#line", label: copy.nav.line },
    { href: "#roasting", label: copy.nav.origin },
    { href: "#how", label: copy.nav.how },
    { href: "#faq", label: copy.nav.faq },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-(--space-gutter)">
        <a href="#top" className="shrink-0" aria-label={copy.meta.title}>
          <Logo />
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-heading"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={CTA_TARGET}
          className="shrink-0 rounded-full bg-accent-fill px-5 py-2.5 text-sm font-semibold text-on-accent transition-[filter] hover:brightness-110"
        >
          {copy.nav.cta}
        </a>
      </div>
    </header>
  );
}
