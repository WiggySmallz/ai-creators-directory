import type { Category } from "@/types";

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span className="text-xs uppercase tracking-wider text-vermillion font-medium">
      {category.name}
    </span>
  );
}
