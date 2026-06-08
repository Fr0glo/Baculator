import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Generates a static sitemap.xml at build time (output: export friendly).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/calculateur", "/simulateur", "/explorer", "/apropos"];
  const lastModified = new Date();
  return routes.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/simulateur" ? 0.9 : 0.7,
  }));
}
