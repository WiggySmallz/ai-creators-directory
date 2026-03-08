import { getTools, getCategories } from "@/lib/data";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse AI Tools — AI for Creators",
  description: "Search and filter AI tools for content creators, designers, and video editors.",
};

export default function ToolsPage() {
  const tools = getTools();
  const categories = getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Browse AI Tools</h1>
      <p className="text-zinc-400 mb-8">Discover the perfect AI tools for your creative workflow.</p>
      <SearchAndFilter tools={tools} categories={categories} />
    </div>
  );
}
