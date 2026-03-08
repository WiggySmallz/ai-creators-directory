import tools from "../../data/tools.json";
import categories from "../../data/categories.json";
import collections from "../../data/collections.json";
import type { Tool, Category, Collection } from "@/types";

export function getTools(): Tool[] {
  return tools as Tool[];
}

export function getToolBySlug(slug: string): Tool | undefined {
  return (tools as Tool[]).find((t) => t.slug === slug);
}

export function getCategories(): Category[] {
  return categories as Category[];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return (categories as Category[]).find((c) => c.slug === slug);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return (tools as Tool[]).filter((t) => t.category === categorySlug);
}

export function getCollections(): Collection[] {
  return collections as Collection[];
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return (collections as Collection[]).find((c) => c.slug === slug);
}

export function getToolsForCollection(collection: Collection): Tool[] {
  return collection.toolSlugs
    .map((slug) => (tools as Tool[]).find((t) => t.slug === slug))
    .filter((t): t is Tool => t !== undefined);
}

export function getFeaturedTools(): Tool[] {
  return (tools as Tool[]).filter((t) => t.featured);
}

export function getSponsoredTools(): Tool[] {
  return (tools as Tool[]).filter((t) => t.sponsored);
}

export function getDeals(): Tool[] {
  return (tools as Tool[]).filter((t) => t.dealText !== null);
}

export function getLatestTools(count: number = 6): Tool[] {
  return [...(tools as Tool[])]
    .sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime())
    .slice(0, count);
}
