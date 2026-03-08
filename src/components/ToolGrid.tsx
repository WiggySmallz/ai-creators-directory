import type { Tool, Category } from "@/types";
import { ToolCard } from "./ToolCard";

interface ToolGridProps {
  tools: Tool[];
  categories: Category[];
}

export function ToolGrid({ tools, categories }: ToolGridProps) {
  const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c]));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-px sm:bg-rule sm:border sm:border-rule">
      {tools.map((tool, i) => (
        <div key={tool.slug} className="sm:bg-cream animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
          <ToolCard tool={tool} category={categoryMap[tool.category]} />
        </div>
      ))}
    </div>
  );
}
