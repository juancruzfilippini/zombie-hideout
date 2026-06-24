import type { Locale } from "@/i18n/config";

export type RouteKey = "home" | "updates" | "media" | "donate" | "contact";

export const localizedRoutes: Record<RouteKey, Record<Locale, string>> = {
  home: {
    es: "/es",
    en: "/en",
  },
  updates: {
    es: "/es/actualizaciones",
    en: "/en/updates",
  },
  media: {
    es: "/es/media",
    en: "/en/media",
  },
  donate: {
    es: "/es/donar",
    en: "/en/donate",
  },
  contact: {
    es: "/es/contacto",
    en: "/en/contact",
  },
};

export function getLocalizedRoute(route: RouteKey, locale: Locale): string {
  return localizedRoutes[route][locale];
}

export function routeFromPath(pathname: string): RouteKey {
  const parts = pathname.split("/").filter(Boolean);
  const segment = parts[1];

  if (segment === "actualizaciones" || segment === "updates") return "updates";
  if (segment === "media") return "media";
  if (segment === "donar" || segment === "donate") return "donate";
  if (segment === "contacto" || segment === "contact") return "contact";

  return "home";
}
