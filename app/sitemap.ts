import type { MetadataRoute } from "next";
import { getPublishedArticles } from "./lib/wordpress";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const home: MetadataRoute.Sitemap[number] = {
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  };
  const archive: MetadataRoute.Sitemap[number] = {
    url: new URL("/articulos", siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  };

  try {
    const articles = await getPublishedArticles();
    return [
      home,
      archive,
      ...articles.map((article) => ({
        url: new URL(
          `/articulos/${encodeURIComponent(article.slug)}`,
          siteUrl,
        ).toString(),
        lastModified: new Date(article.modified || article.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];
  } catch {
    return [home, archive];
  }
}
