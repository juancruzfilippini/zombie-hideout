import { notFound } from "next/navigation";

import { ContactPage } from "@/components/pages/contact-page";
import { isLocale } from "@/i18n/config";

export default async function SpanishContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== "es") notFound();
  return <ContactPage locale={locale} />;
}
