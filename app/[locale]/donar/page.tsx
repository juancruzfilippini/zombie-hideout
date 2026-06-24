import { notFound } from "next/navigation";

import { DonationsPage } from "@/components/pages/donations-page";
import { isLocale } from "@/i18n/config";

export default async function SpanishDonatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== "es") notFound();
  return <DonationsPage locale={locale} />;
}
