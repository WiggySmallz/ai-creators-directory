import { LucideIcon } from "./LucideIcon";
import type { Category } from "@/types";

const colors: Record<string, string> = {
  video: "text-red-400",
  image: "text-pink-400",
  writing: "text-blue-400",
  audio: "text-purple-400",
  design: "text-cyan-400",
  social: "text-orange-400",
  seo: "text-green-400",
};

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span className={`flex items-center gap-1 text-xs ${colors[category.slug] || "text-zinc-400"}`}>
      <LucideIcon name={category.icon} size={12} />
      {category.name}
    </span>
  );
}
