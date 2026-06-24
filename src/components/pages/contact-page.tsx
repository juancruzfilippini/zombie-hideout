import { ContactForm } from "@/components/contact/contact-form";
import { SocialLinks } from "@/components/layout/social-links";
import { SectionHeader } from "@/components/shared/section-header";
import { Panel, PanelBody } from "@/components/ui/panel";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function ContactPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <section className="section-shell">
      <SectionHeader
        eyebrow="RADIO COMMS"
        title={dict.sections.contactTitle}
        lead={
          locale === "es"
            ? "Envía sugerencias, reportes o solicitudes de ayuda para la comunidad."
            : "Send suggestions, reports, or help requests for the community."
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_0.6fr]">
        <ContactForm locale={locale} dict={dict} />
        <Panel>
          <PanelBody>
            <h2 className="text-xl font-black uppercase text-zinc-50">Social</h2>
            <div className="mt-4">
              <SocialLinks emptyLabel={dict.common.configuredSoon} />
            </div>
          </PanelBody>
        </Panel>
      </div>
    </section>
  );
}
