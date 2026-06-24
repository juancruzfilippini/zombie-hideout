import { notFound } from "next/navigation";

import { DonationsPage } from "@/components/pages/donations-page";
import { isLocale } from "@/i18n/config";

export default async function EnglishDonatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== "en") notFound();
  return <DonationsPage locale={locale} />;
}
