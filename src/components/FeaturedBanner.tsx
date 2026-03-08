import type { Tool, Category } from "@/types";
import { ToolGrid } from "./ToolGrid";

interface FeaturedBannerProps {
  tools: Tool[];
  categories: Category[];
}

export function FeaturedBanner({ tools, categories }: FeaturedBannerProps) {
  if (tools.length === 0) return null;
  return (
    <section className="py-20 px-6 lg:px-8 border-b border-rule">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="font-serif text-3xl text-ink">Editor&apos;s picks</h2>
          <p className="text-sm text-ink-faint">Hand-selected by our team</p>
        </div>
        <ToolGrid tools={tools} categories={categories} />
      </div>
    </section>
  );
}
