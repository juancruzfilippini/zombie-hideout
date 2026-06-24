import { MediaGallery } from "@/components/media/media-gallery";
import { SectionHeader } from "@/components/shared/section-header";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function MediaPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <section className="section-shell">
      <SectionHeader
        eyebrow="MEDIA CENTER"
        title={dict.sections.mediaTitle}
        lead={
          locale === "es"
            ? "Imagen principal del servidor y espacio preparado para sumar nuevas capturas autorizadas."
            : "Primary server artwork with room to add more approved screenshots later."
        }
      />
      <MediaGallery locale={locale} dict={dict} />
    </section>
  );
}
