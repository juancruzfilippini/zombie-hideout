export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale =
  process.env.NEXT_PUBLIC_DEFAULT_LOCALE === "en" ? "en" : "es";

export const localeLabels: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export type Localized<T = string> = Record<Locale, T>;

export function getLocalized<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
