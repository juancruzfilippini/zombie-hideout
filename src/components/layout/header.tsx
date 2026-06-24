import Link from "next/link";
import { RadioTower, ShieldAlert } from "lucide-react";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Button } from "@/components/ui/button";
import { serverConfig } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getLocalizedRoute } from "@/i18n/routes";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const home = getLocalizedRoute("home", locale);
  const items = [
    { label: dict.nav.home, href: home },
    { label: dict.nav.server, href: `${home}#server` },
    { label: dict.nav.zombieMod, href: `${home}#zombie-mod` },
    { label: dict.nav.updates, href: getLocalizedRoute("updates", locale) },
    { label: dict.nav.team, href: `${home}#team` },
    { label: dict.nav.media, href: getLocalizedRoute("media", locale) },
    { label: dict.nav.donate, href: getLocalizedRoute("donate", locale) },
    { label: dict.nav.contact, href: getLocalizedRoute("contact", locale) },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090c09]/85 backdrop-blur-xl">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[#b9ff46] focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={home} className="group inline-flex items-center gap-3" aria-label="Hideout Gaming">
          <span className="flex h-10 w-10 items-center justify-center border border-[#b9ff46]/50 bg-[#b9ff46]/10 text-[#b9ff46]">
            <ShieldAlert aria-hidden size={20} />
          </span>
          <span className="leading-none">
            <span className="block text-sm font-black uppercase tracking-[0.18em] text-zinc-50">
              Hideout
            </span>
            <span className="block text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#b9ff46]">
              Zombie Hideout
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
          {items.slice(0, 7).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-zinc-300 transition hover:text-[#b9ff46]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden xl:block">
            <LanguageSwitcher locale={locale} />
          </div>
          <Button asChild size="sm" className="hidden xl:inline-flex">
            <a href={serverConfig.steamConnectUrl}>
              <RadioTower aria-hidden size={15} />
              {dict.common.playNow}
            </a>
          </Button>
          <MobileNavigation items={items} dict={dict} locale={locale} />
        </div>
      </div>
    </header>
  );
}
