import type { SiteSettings } from "@/lib/types";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {settings.fullName}. Tous droits
          réservés.
        </p>
        <p>Conçu &amp; développé avec Next.js</p>
      </div>
    </footer>
  );
}
