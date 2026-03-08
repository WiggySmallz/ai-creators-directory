import Link from "next/link";
import Image from "next/image";
import type { Tool, Category } from "@/types";
import { CategoryBadge } from "./CategoryBadge";
import { PricingBadge } from "./PricingBadge";
import { DealBadge } from "./DealBadge";
import { ArrowUpRight } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
  category: Category;
}

export function ToolCard({ tool, category }: ToolCardProps) {
  return (
    <article className="group relative border-b border-rule pb-6 mb-6 last:border-0 last:pb-0 last:mb-0 sm:border sm:border-rule sm:p-6 sm:mb-0 sm:pb-6 hover:bg-cream-dark/50 transition-colors">
      {tool.sponsored && (
        <span className="absolute top-2 right-2 text-[10px] uppercase tracking-widest text-ink-faint">Sponsored</span>
      )}
      <div className="flex items-start gap-4 mb-3">
        <div className="w-10 h-10 bg-surface border border-rule flex items-center justify-center shrink-0 overflow-hidden">
          <Image src={tool.logo} alt={`${tool.name} logo`} width={40} height={40} className="object-contain" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/tools/${tool.slug}`} className="font-medium text-ink hover:text-vermillion transition-colors block leading-tight">
              {tool.name}
            </Link>
            <span className="text-xs text-ink-faint tabular-nums">{tool.rating}</span>
          </div>
          <p className="text-sm text-ink-muted line-clamp-2 mt-1 leading-relaxed">{tool.tagline}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <CategoryBadge category={category} />
        <span className="text-rule">|</span>
        <PricingBadge pricing={tool.pricing} />
        {tool.dealText && (
          <>
            <span className="text-rule">|</span>
            <DealBadge text={tool.dealText} />
          </>
        )}
        <a
          href={tool.affiliateUrl || tool.url}
          target="_blank"
          rel="noopener sponsored"
          className="ml-auto inline-flex items-center gap-1 text-xs text-ink-muted hover:text-vermillion transition-colors"
        >
          Visit <ArrowUpRight size={12} />
        </a>
      </div>
    </article>
  );
}
