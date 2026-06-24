import Link from "next/link";

import { SocialLinks } from "@/components/layout/social-links";
import { serverConfig } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getLocalizedRoute } from "@/i18n/routes";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="border-t border-white/10 bg-[#070907]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-zinc-50">
            Hideout Gaming
          </p>
          <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">{dict.footer.source}</p>
          <p className="mt-4 font-mono text-xs text-[#b9ff46]">{serverConfig.address}</p>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-400">
            Navigation
          </p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            <li>
              <Link href={getLocalizedRoute("updates", locale)}>{dict.nav.updates}</Link>
            </li>
            <li>
              <Link href={getLocalizedRoute("media", locale)}>{dict.nav.media}</Link>
            </li>
            <li>
              <Link href={getLocalizedRoute("donate", locale)}>{dict.nav.donate}</Link>
            </li>
            <li>
              <Link href={getLocalizedRoute("contact", locale)}>{dict.nav.contact}</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-400">Comms</p>
          <div className="mt-3">
            <SocialLinks emptyLabel={dict.common.configuredSoon} />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-zinc-500">
        © 2026 Hideout Corporation. {dict.footer.rights}
      </div>
    </footer>
  );
}
