import { Tag } from "lucide-react";

export function DealBadge({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-1 text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full">
      <Tag size={10} />
      {text}
    </span>
  );
}
