import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CookiePreferences } from "@/components/layout/cookie-preferences";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ReducedMotionProvider } from "@/components/layout/reduced-motion-provider";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { absoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "es";
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: absoluteUrl(`/${locale}`),
      languages: {
        es: absoluteUrl("/es"),
        en: absoluteUrl("/en"),
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: absoluteUrl(`/${locale}`),
      siteName: "Zombie Hideout",
      images: [absoluteUrl("/assets/og-image.svg")],
      locale: locale === "es" ? "es_AR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [absoluteUrl("/assets/og-image.svg")],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const dict = getDictionary(rawLocale);

  return (
    <>
      <ReducedMotionProvider />
      <Header locale={rawLocale} dict={dict} />
      <main id="main-content">{children}</main>
      <Footer locale={rawLocale} dict={dict} />
      <CookiePreferences />
    </>
  );
}
