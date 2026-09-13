import { copy } from "@/lib/copy";
import { REGIONS } from "@/lib/regions";
import { SITE, mailtoUrl, telUrl } from "@/lib/site";
import { Logo } from "./logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-(--space-gutter) py-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)_minmax(0,14rem)] lg:gap-16">
          <div>
            <Logo />
            <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-muted">
              {copy.footer.tagline}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {copy.footer.regionsTitle}
            </h2>
            <ul className="mt-5 grid gap-x-8 gap-y-2 text-sm text-text sm:grid-cols-2">
              {REGIONS.map((r) => (
                <li key={r.id}>{copy.regions.items[r.id].name}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {copy.footer.contactTitle}
            </h2>
            <ul className="mt-5 grid gap-2.5 text-sm">
              <li>
                <a href={mailtoUrl} className="text-accent underline underline-offset-4">
                  {SITE.email}
                </a>
              </li>
              {/* Rendered only when a real number exists — a placeholder phone
                  number on a wholesale site is worse than no phone number. */}
              {SITE.phoneDisplay ? (
                <li>
                  <a href={telUrl} className="text-text hover:text-heading">
                    {SITE.phoneDisplay}
                  </a>
                </li>
              ) : null}
              <li className="text-muted">
                {SITE.roastCity}, {SITE.country}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {SITE.name}. {copy.footer.rights}
          </p>
          <p className="max-w-[52ch]">{copy.footer.builtNote}</p>
        </div>
      </div>
    </footer>
  );
}
