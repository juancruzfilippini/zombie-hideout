import type { MetadataRoute } from "next";

import { localizedRoutes } from "@/i18n/routes";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(localizedRoutes).flatMap((routes) =>
    Object.values(routes).map((path) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "/es" || path === "/en" ? 1 : 0.8,
    })),
  );
}
