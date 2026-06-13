import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://literaciaedu.com.br"
  const locales = ["pt", "en", "es"]
  const paths = ["", "/about", "/solutions", "/press", "/contact", "/privacy", "/terms"]

  const sitemapEntries: MetadataRoute.Sitemap = []

  for (const path of paths) {
    for (const locale of locales) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: path === "" ? 1.0 : 0.8,
      })
    }
  }

  return sitemapEntries
}
