import type { Localized } from "@/i18n/config";

export type DonationTier = {
  id: "vip" | "vip-plus" | "admin" | "admin-plus" | "custom";
  label: Localized;
  amount: number | null;
  currency: "USD" | "ARS";
  description: Localized;
  banner: string;
  accent: "green" | "orange" | "blue" | "pink";
  benefits: Localized<string[]>;
};

export const donationTiers: DonationTier[] = [
  {
    id: "vip",
    label: { es: "VIP", en: "VIP" },
    amount: null,
    currency: "USD",
    banner: "/assets/donations/vip-banner.png",
    accent: "green",
    description: {
      es: "Rango de apoyo para jugadores que quieren beneficios básicos dentro del servidor.",
      en: "Support rank for players who want basic in-server perks.",
    },
    benefits: {
      es: ["Beneficios configurables", "Reconocimiento en comunidad", "Activación tras confirmación"],
      en: ["Configurable perks", "Community recognition", "Activation after confirmation"],
    },
  },
  {
    id: "vip-plus",
    label: { es: "VIP Plus", en: "VIP Plus" },
    amount: null,
    currency: "USD",
    banner: "/assets/donations/vip-plus-banner.png",
    accent: "pink",
    description: {
      es: "Rango superior para quienes buscan más funciones VIP configurables.",
      en: "Higher rank for players who want more configurable VIP features.",
    },
    benefits: {
      es: ["Más funciones que VIP", "Prioridad configurable", "Activación manual o automática"],
      en: ["More features than VIP", "Configurable priority", "Manual or automatic activation"],
    },
  },
  {
    id: "admin",
    label: { es: "Admin", en: "Admin" },
    amount: null,
    currency: "USD",
    banner: "/assets/donations/admin-banner.png",
    accent: "orange",
    description: {
      es: "Rango administrativo sujeto a reglas, confianza y aprobación de la comunidad.",
      en: "Administrative rank subject to rules, trust, and community approval.",
    },
    benefits: {
      es: ["Permisos limitados", "Responsabilidad de moderación", "Aprobación requerida"],
      en: ["Limited permissions", "Moderation responsibility", "Approval required"],
    },
  },
  {
    id: "admin-plus",
    label: { es: "Admin Plus", en: "Admin Plus" },
    amount: null,
    currency: "USD",
    banner: "/assets/donations/admin-plus-banner.png",
    accent: "blue",
    description: {
      es: "Rango avanzado para administración del servidor, siempre con revisión previa.",
      en: "Advanced rank for server administration, always with prior review.",
    },
    benefits: {
      es: ["Funciones avanzadas", "Mayor responsabilidad", "Revisión del equipo"],
      en: ["Advanced features", "Greater responsibility", "Team review"],
    },
  },
  {
    id: "custom",
    label: { es: "Otro importe", en: "Other amount" },
    amount: null,
    currency: "USD",
    banner: "/assets/donations/binance-logo.png",
    accent: "orange",
    description: {
      es: "Compra o aporte manual mientras los precios definitivos se configuran.",
      en: "Manual purchase or support while final prices are configured.",
    },
    benefits: {
      es: ["Importe personalizado", "Revisión manual", "Soporte para casos especiales"],
      en: ["Custom amount", "Manual review", "Support for special cases"],
    },
  },
];

export const donationConditions = [
  {
    es: "Las compras de rangos ayudan a cubrir mantenimiento, infraestructura y herramientas de la comunidad.",
    en: "Rank purchases help cover maintenance, infrastructure, and community tools.",
  },
  {
    es: "VIP, VIP Plus, Admin y Admin Plus dependen de configuración, disponibilidad y cumplimiento de reglas.",
    en: "VIP, VIP Plus, Admin, and Admin Plus depend on configuration, availability, and rule compliance.",
  },
  {
    es: "Los beneficios se activan solamente después de confirmar el pago y nunca antes.",
    en: "Benefits are activated only after payment confirmation and never before.",
  },
] satisfies Localized[];
