import type { Tool, Category } from "@/types";
import { ToolCard } from "./ToolCard";

interface ToolGridProps {
  tools: Tool[];
  categories: Category[];
}

export function ToolGrid({ tools, categories }: ToolGridProps) {
  const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c]));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} category={categoryMap[tool.category]} />
      ))}
    </div>
  );
}
