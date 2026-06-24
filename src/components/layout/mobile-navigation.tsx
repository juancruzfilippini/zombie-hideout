"use client";

import Link from "next/link";
import { Menu, RadioTower, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { serverConfig } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type NavItem = {
  label: string;
  href: string;
};

export function MobileNavigation({
  items,
  dict,
  locale,
}: {
  items: NavItem[];
  dict: Dictionary;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <Button
        type="button"
        size="icon"
        variant="ghost"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? dict.nav.close : dict.nav.menu}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden size={18} /> : <Menu aria-hidden size={18} />}
      </Button>

      {open ? (
        <div
          id="mobile-navigation"
          className="fixed inset-x-3 top-20 z-[70] border border-white/10 bg-[#0a0d0b]/95 p-4 shadow-2xl backdrop-blur"
        >
          <nav aria-label="Mobile">
            <ul className="grid gap-2">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-zinc-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-4">
            <LanguageSwitcher locale={locale} />
          </div>
          <Button asChild className="mt-4 w-full">
            <a href={serverConfig.steamConnectUrl}>
              <RadioTower aria-hidden size={16} />
              {dict.common.playNow}
            </a>
          </Button>
        </div>
      ) : null}
    </div>
  );
}
