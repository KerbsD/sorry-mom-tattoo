import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/design",
    "/portfolio",
    "/merch",
    "/aftercare",
    "/contact",
  ];
  const now = new Date();

  return [
    ...pages.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: now,
      priority: path === "" ? 1 : 0.7,
    })),
  ];
}
