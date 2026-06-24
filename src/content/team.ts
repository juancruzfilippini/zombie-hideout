import type { Localized } from "@/i18n/config";

export type TeamMember = {
  id: string;
  name: string;
  role: Localized;
  description: Localized;
  avatar: string;
  socials: { label: string; url: string }[];
  visible: boolean;
};

export const teamMembers: TeamMember[] = [
  {
    id: "cadi",
    name: "Cadí ☆",
    role: { es: "El Creador", en: "The Creator" },
    description: {
      es: "Descripción pública pendiente de confirmar por el propietario.",
      en: "Public description pending owner confirmation.",
    },
    avatar: "/assets/team/cadi.png",
    socials: [],
    visible: true,
  },
  {
    id: "rocio",
    name: "Rocío ღ",
    role: { es: "Co-Fundadora", en: "Co-Founder" },
    description: {
      es: "Descripción pública pendiente de confirmar por el propietario.",
      en: "Public description pending owner confirmation.",
    },
    avatar: "/assets/team/rocio.png",
    socials: [],
    visible: true,
  },
  {
    id: "mr-agostini",
    name: "Mr. Agostini",
    role: { es: "Moderador Increíble", en: "Incredible Moderator" },
    description: {
      es: "Descripción pública pendiente de confirmar por el propietario.",
      en: "Public description pending owner confirmation.",
    },
    avatar: "/assets/team/mr-agostini.png",
    socials: [],
    visible: true,
  },
];
