import Link from "next/link";
import Image from "next/image";
import type { Tool, Category } from "@/types";
import { PricingBadge } from "./PricingBadge";
import { SkillBadge } from "./SkillBadge";
import { CategoryBadge } from "./CategoryBadge";
import { DealBadge } from "./DealBadge";
import { ExternalLink, Star } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
  category: Category;
}

export function ToolCard({ tool, category }: ToolCardProps) {
  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/5">
      {tool.sponsored && (
        <span className="absolute top-3 right-3 text-[10px] text-zinc-500 uppercase tracking-wider">Sponsored</span>
      )}
      <div className="flex items-start gap-4 mb-3">
        <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 overflow-hidden">
          <Image src={tool.logo} alt={`${tool.name} logo`} width={48} height={48} className="object-contain" />
        </div>
        <div className="min-w-0">
          <Link href={`/tools/${tool.slug}`} className="font-semibold text-white hover:text-purple-400 transition-colors block truncate">
            {tool.name}
          </Link>
          <p className="text-sm text-zinc-400 line-clamp-1">{tool.tagline}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 mb-3">
        <Star size={14} className="text-amber-400 fill-amber-400" />
        <span className="text-sm text-zinc-300">{tool.rating}</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <CategoryBadge category={category} />
        <PricingBadge pricing={tool.pricing} />
        <SkillBadge level={tool.skillLevel} />
        {tool.dealText && <DealBadge text={tool.dealText} />}
      </div>
      <a
        href={tool.affiliateUrl || tool.url}
        target="_blank"
        rel="noopener sponsored"
        className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors"
      >
        Visit Tool <ExternalLink size={14} />
      </a>
    </div>
  );
}
