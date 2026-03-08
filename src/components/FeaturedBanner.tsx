import type { Tool, Category } from "@/types";
import { ToolGrid } from "./ToolGrid";

interface FeaturedBannerProps {
  tools: Tool[];
  categories: Category[];
}

export function FeaturedBanner({ tools, categories }: FeaturedBannerProps) {
  if (tools.length === 0) return null;
  return (
    <section className="py-16 px-4 bg-zinc-900/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Featured Tools</h2>
        <ToolGrid tools={tools} categories={categories} />
      </div>
    </section>
  );
}
