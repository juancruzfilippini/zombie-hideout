import type { Localized } from "@/i18n/config";

export type MediaKind = "screenshot" | "video" | "music";
export type MediaTag =
  | "community"
  | "updates"
  | "counter-strike-source"
  | "counter-strike-2";

export type MediaItem = {
  id: string;
  kind: MediaKind;
  title: Localized;
  description: Localized;
  src: string;
  alt: Localized;
  tags: MediaTag[];
  youtubeId?: string;
  audioSrc?: string;
  authorized: boolean;
};

export const mediaItems: MediaItem[] = [
  {
    id: "real-zombies-industrial-yard",
    kind: "screenshot",
    title: { es: "Zombis reales del servidor", en: "Real server zombies" },
    description: {
      es: "Arte fusionado con el fondo industrial elegido y los modelos reales de Zombie Hideout.",
      en: "Merged artwork using the selected industrial background and the real Zombie Hideout models.",
    },
    src: "/assets/community/real-zombies-industrial-yard.jpg",
    alt: {
      es: "Zombis reales de Zombie Hideout en un patio industrial oscuro",
      en: "Real Zombie Hideout zombies in a dark industrial yard",
    },
    tags: ["community", "counter-strike-source"],
    authorized: true,
  },
  {
    id: "original-about-section",
    kind: "screenshot",
    title: { es: "Arte histórico de la comunidad", en: "Historical community artwork" },
    description: {
      es: "Captura de la web original con arte característico de Zombie Hideout.",
      en: "Original website capture with characteristic Zombie Hideout artwork.",
    },
    src: "/assets/community/original-about-section.png",
    alt: {
      es: "Sección histórica sobre nosotros con arte de zombis",
      en: "Historical about section with zombie artwork",
    },
    tags: ["community", "counter-strike-source"],
    authorized: false,
  },
  {
    id: "zombie-mod-reference",
    kind: "screenshot",
    title: { es: "CS:S Zombie Mod", en: "CS:S Zombie Mod" },
    description: {
      es: "Referencia visual del estilo Zombie Mod clásico del servidor.",
      en: "Visual reference for the server's classic Zombie Mod style.",
    },
    src: "/assets/community/original-zombie-mod-reference.png",
    alt: {
      es: "Alineación de zombis de Counter-Strike Source Zombie Mod",
      en: "Counter-Strike Source Zombie Mod zombie lineup",
    },
    tags: ["updates", "counter-strike-source"],
    authorized: false,
  },
  {
    id: "generated-zombie-lineup",
    kind: "screenshot",
    title: { es: "Nueva horda Zombie Hideout", en: "New Zombie Hideout horde" },
    description: {
      es: "Arte nuevo generado para acompañar la identidad visual de Zombie Hideout.",
      en: "New generated artwork for the Zombie Hideout visual identity.",
    },
    src: "/assets/generated/zombie-lineup-01.jpg",
    alt: {
      es: "Nueva alineación de zombis para Zombie Hideout",
      en: "New Zombie Hideout zombie lineup",
    },
    tags: ["community", "counter-strike-source"],
    authorized: false,
  },
  {
    id: "vip-shop-original",
    kind: "screenshot",
    title: { es: "Tienda VIP original", en: "Original VIP shop" },
    description: {
      es: "Referencia visual para los rangos VIP, VIP Plus, Admin y Admin Plus.",
      en: "Visual reference for VIP, VIP Plus, Admin, and Admin Plus ranks.",
    },
    src: "/assets/community/original-donations-section.png",
    alt: {
      es: "Sección original de compra y donación con banners de rangos",
      en: "Original purchase and donation section with rank banners",
    },
    tags: ["community", "updates"],
    authorized: false,
  },
  {
    id: "video-placeholder",
    kind: "video",
    title: { es: "Videos de Counter-Strike", en: "Counter-Strike videos" },
    description: {
      es: "Los embeds de YouTube se cargarán solo cuando exista un video autorizado.",
      en: "YouTube embeds will load only when an authorized video exists.",
    },
    src: "/assets/media-placeholder.svg",
    alt: {
      es: "Placeholder de video para Zombie Hideout",
      en: "Zombie Hideout video placeholder",
    },
    tags: ["counter-strike-source", "counter-strike-2"],
    authorized: false,
  },
  {
    id: "music-placeholder",
    kind: "music",
    title: { es: "Música de Hideout", en: "Hideout music" },
    description: {
      es: "Música o canciones autorizadas para entretener a la comunidad. Sin reproducción automática.",
      en: "Authorized music or songs for the community. No autoplay.",
    },
    src: "/assets/media-placeholder.svg",
    alt: {
      es: "Interfaz de audio para Zombie Hideout",
      en: "Audio interface for Zombie Hideout",
    },
    tags: ["community"],
    authorized: false,
  },
];
