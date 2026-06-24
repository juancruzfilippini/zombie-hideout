import Link from "next/link";

import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getLocalizedRoute } from "@/i18n/routes";
import { MediaGallery } from "@/components/media/media-gallery";

export function MediaPreview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="section-shell">
      <SectionHeader
        eyebrow="MEDIA CENTER"
        title={dict.sections.mediaTitle}
        action={
          <Button asChild variant="secondary">
            <Link href={getLocalizedRoute("media", locale)}>{dict.common.readMore}</Link>
          </Button>
        }
      />
      <MediaGallery locale={locale} dict={dict} />
    </section>
  );
}
