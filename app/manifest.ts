import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zombie Hideout",
    short_name: "ZH",
    description: "Counter-Strike: Source Zombie Mod community.",
    start_url: "/es",
    display: "standalone",
    background_color: "#070907",
    theme_color: "#b9ff46",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
