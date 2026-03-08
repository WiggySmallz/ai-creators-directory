import { getTools, getCategories, getCollections } from "@/lib/data";
import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aiforcreators.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getTools().map((tool) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: new Date(tool.addedDate),
  }));

  const categories = getCategories().map((cat) => ({
    url: `${BASE_URL}/category/${cat.slug}`,
    lastModified: new Date(),
  }));

  const collections = getCollections().map((col) => ({
    url: `${BASE_URL}/collections/${col.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/tools`, lastModified: new Date() },
    { url: `${BASE_URL}/collections`, lastModified: new Date() },
    { url: `${BASE_URL}/deals`, lastModified: new Date() },
    { url: `${BASE_URL}/about`, lastModified: new Date() },
    ...tools,
    ...categories,
    ...collections,
  ];
}
