import { notFound } from "next/navigation";

import { UpdatesPage } from "@/components/pages/updates-page";
import { isLocale } from "@/i18n/config";

export default async function EnglishUpdatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== "en") notFound();
  return <UpdatesPage locale={locale} />;
}
