import { getTools, getCategories } from "@/lib/data";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Directory — AI for Creators",
  description: "Search and filter AI tools for content creators, designers, and video editors.",
};

export default function ToolsPage() {
  const tools = getTools();
  const categories = getCategories();

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-muted mb-3">Directory</p>
        <h1 className="font-serif text-4xl text-ink mb-3">Browse all tools</h1>
        <p className="text-ink-light">Discover the perfect AI tools for your creative workflow.</p>
      </div>
      <SearchAndFilter tools={tools} categories={categories} />
    </div>
  );
}
