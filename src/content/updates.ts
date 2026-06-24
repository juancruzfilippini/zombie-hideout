import type { Localized } from "@/i18n/config";

export type PatchNote = {
  id: string;
  dossierCode: string;
  title: Localized;
  dateCandidates: string[];
  confirmedDate: string | null;
  affectedServer: string;
  category: Localized;
  tags: string[];
  changes: { label: string; body: Localized }[];
};

// TODO(owner): Confirm whether 17/04/2026 and 14/06/2026 refer to one corrected date or two separate publications.
export const patchDateCandidates = ["2026-04-17", "2026-06-14"];

export const patchNotes: PatchNote[] = [
  {
    id: "zh-css-mods-2026",
    dossierCode: "QTN-ZH-CSS-001",
    title: {
      es: "Actualización de módulos Zombie Hideout",
      en: "Zombie Hideout module update",
    },
    dateCandidates: patchDateCandidates,
    confirmedDate: null,
    affectedServer: "[Steam] Zombie Hideout - CS:S",
    category: { es: "Mods", en: "Mods" },
    tags: ["!xp", "!tall", "zombie", "!sounds", "!props"],
    changes: [
      {
        label: "!xp",
        body: {
          es: "Menús actualizados, VIP agregado, páginas agregadas y ajustes importantes.",
          en: "Updated menus, VIP added, pages added, and important tuning.",
        },
      },
      {
        label: "!tall",
        body: {
          es: "Menús actualizados, API mejorada y correcciones aplicadas.",
          en: "Updated menus, improved API, and applied fixes.",
        },
      },
      {
        label: "ZOMBIE",
        body: {
          es: "Menús actualizados, efectos revisados y optimizaciones del servidor.",
          en: "Updated menus, revised effects, and server optimizations.",
        },
      },
      {
        label: "Fall Damage",
        body: {
          es: "Corrección del daño por caída para evitar valores ilógicos.",
          en: "Fall damage fix to prevent illogical values.",
        },
      },
      {
        label: "Grenade Plant",
        body: {
          es: "Optimización de explosiones.",
          en: "Explosion optimization.",
        },
      },
      {
        label: "!sounds",
        body: {
          es: "Menús actualizados, administración agregada, API optimizada y páginas agregadas.",
          en: "Updated menus, admin tools added, optimized API, and pages added.",
        },
      },
      {
        label: "Event Sounds",
        body: {
          es: "Nuevos sonidos de eventos agregados.",
          en: "New event sounds added.",
        },
      },
      {
        label: "Ammo",
        body: {
          es: "Munición de la granada HE corregida: ahora solo una por defecto.",
          en: "HE grenade ammo corrected: now one by default.",
        },
      },
      {
        label: "Voice Pitch",
        body: {
          es: "Corrección del audio de voces de zombis.",
          en: "Zombie voice pitch correction.",
        },
      },
      {
        label: "Anuncios",
        body: {
          es: "Anuncios del servidor actualizados.",
          en: "Server announcements updated.",
        },
      },
      {
        label: "!props",
        body: {
          es: "Nuevos modelos, páginas y correcciones de carga agregadas.",
          en: "New models, pages, and loading fixes added.",
        },
      },
    ],
  },
  {
    id: "zh-cs2-coming-soon",
    dossierCode: "QTN-ZH-CS2-002",
    title: {
      es: "Preparación de Zombie Hideout 2",
      en: "Zombie Hideout 2 preparation",
    },
    dateCandidates: ["2026-04-17"],
    confirmedDate: null,
    affectedServer: "[CS2] Zombie Hideout 2",
    category: { es: "Futuro servidor", en: "Future server" },
    tags: ["CS2", "Zombie"],
    changes: [
      {
        label: "Zombie",
        body: {
          es: "Registro preliminar para un futuro servidor de Counter-Strike 2. Sin fecha de lanzamiento confirmada.",
          en: "Preliminary record for a future Counter-Strike 2 server. No launch date confirmed.",
        },
      },
    ],
  },
];
