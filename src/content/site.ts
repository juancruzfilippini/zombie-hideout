import type { Localized } from "@/i18n/config";

export const serverConfig = {
  name: "[Steam] Zombie Hideout",
  host: "168.100.162.59",
  port: 27031,
  game: "Counter-Strike: Source",
  gameDigType: "css",
  primaryMod: "Zombie Mod",
  get address() {
    return `${this.host}:${this.port}`;
  },
  get steamConnectUrl() {
    return `steam://connect/${this.address}`;
  },
  get consoleCommand() {
    return `connect ${this.address}`;
  },
  steamStoreUrl: "https://store.steampowered.com/app/240/CounterStrike_Source/",
} as const;

// TODO(owner): Confirm whether the correct history is founded in 2005, relaunched in 2024, or only founded in 2024.
export const communityHistory = {
  legacySince: 2005,
  relaunchYear: 2024,
  foundedYear: 2024,
  visibleYear: 2024,
};

export const communityCopy = {
  intro: {
    es: "Bienvenido a la comunidad Hideout Gaming y Zombie Hideout.",
    en: "Welcome to the Hideout Gaming and Zombie Hideout community.",
  },
  body: {
    es: "Somos un grupo de jugadores y programadores que busca mejorar sus servidores de forma constante, publicar contenido exclusivo y escuchar sugerencias de la comunidad.",
    en: "We are a group of players and developers constantly working to improve our servers, ship exclusive content, and listen to community suggestions.",
  },
} satisfies Record<string, Localized>;

export const upcomingServer = {
  name: "[CS2] Zombie Hideout 2",
  game: "Counter-Strike 2",
  status: {
    es: "Muy pronto",
    en: "Coming soon",
  },
  description: {
    es: "Un futuro servidor preparado para la nueva generación de Counter-Strike. No hay fecha de lanzamiento confirmada.",
    en: "A future server prepared for the new generation of Counter-Strike. No release date has been confirmed.",
  },
} satisfies {
  name: string;
  game: string;
  status: Localized;
  description: Localized;
};

export const zombieExperienceCards = [
  {
    id: "human",
    title: { es: "Sobrevive como humano", en: "Survive as human" },
    body: {
      es: "Defiende rutas, administra recursos y coordina posiciones hasta el cierre de la ronda.",
      en: "Hold routes, manage resources, and coordinate positions until the round closes.",
    },
  },
  {
    id: "zombie",
    title: { es: "Caza como zombi", en: "Hunt as zombie" },
    body: {
      es: "Presiona al equipo humano con movilidad, emboscadas y control de mapa.",
      en: "Pressure the human team with mobility, ambushes, and map control.",
    },
  },
  {
    id: "progress",
    title: { es: "Progresa y desbloquea", en: "Progress and unlock" },
    body: {
      es: "Sistemas como menús, VIP y progresión se mantienen como contenido editable según configuración del servidor.",
      en: "Systems such as menus, VIP, and progression remain editable server content depending on configuration.",
    },
  },
  {
    id: "maps",
    title: { es: "Domina los mapas", en: "Master the maps" },
    body: {
      es: "Mapas Zombie Mod y Zombie Escape pueden convivir con contenido personalizado autorizado.",
      en: "Zombie Mod and Zombie Escape maps can coexist with authorized custom content.",
    },
  },
  {
    id: "events",
    title: { es: "Participa en eventos", en: "Join events" },
    body: {
      es: "Eventos especiales, sonidos y modelos se presentan como capacidades configurables, no promesas cerradas.",
      en: "Special events, sounds, and models are presented as configurable capabilities, not fixed promises.",
    },
  },
] as const;
