"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { localeLabels, locales, type Locale } from "@/i18n/config";
import { getLocalizedRoute, routeFromPath } from "@/i18n/routes";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const route = routeFromPath(pathname);

  return (
    <div className="inline-flex border border-white/10 bg-black/30" aria-label="Language">
      {locales.map((item) => (
        <Link
          key={item}
          href={getLocalizedRoute(route, item)}
          onClick={() => {
            document.cookie = `zh_locale=${item}; path=/; max-age=31536000; samesite=lax`;
            window.localStorage.setItem("zh_locale", item);
          }}
          className={cn(
            "px-3 py-2 text-xs font-black transition hover:bg-white/10",
            item === locale ? "bg-[#b9ff46] text-black" : "text-zinc-300",
          )}
          aria-current={item === locale ? "page" : undefined}
        >
          {localeLabels[item]}
        </Link>
      ))}
    </div>
  );
}
