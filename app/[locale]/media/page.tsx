import { notFound } from "next/navigation";

import { MediaPage } from "@/components/pages/media-page";
import { isLocale } from "@/i18n/config";

export default async function LocaleMediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <MediaPage locale={locale} />;
}
