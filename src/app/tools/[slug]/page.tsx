import { notFound } from "next/navigation";
import { getToolBySlug, getTools, getCategories, getToolsByCategory } from "@/lib/data";
import { ToolGrid } from "@/components/ToolGrid";
import { PricingBadge } from "@/components/PricingBadge";
import { SkillBadge } from "@/components/SkillBadge";
import { CategoryBadge } from "@/components/CategoryBadge";
import { DealBadge } from "@/components/DealBadge";
import { ExternalLink, Star, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getTools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool Not Found" };
  return {
    title: `${tool.name} — AI for Creators`,
    description: tool.tagline,
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const categories = getCategories();
  const category = categories.find((c) => c.slug === tool.category);
  const relatedTools = getToolsByCategory(tool.category)
    .filter((t) => t.slug !== tool.slug)
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/tools" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
        <ArrowLeft size={16} /> Back to all tools
      </Link>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mb-8">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-16 h-16 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 overflow-hidden">
            <Image src={tool.logo} alt={`${tool.name} logo`} width={64} height={64} className="object-contain" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{tool.name}</h1>
            <p className="text-lg text-zinc-400">{tool.tagline}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {category && <CategoryBadge category={category} />}
          <PricingBadge pricing={tool.pricing} />
          <SkillBadge level={tool.skillLevel} />
          {tool.dealText && <DealBadge text={tool.dealText} />}
          {tool.sponsored && (
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider self-center">Sponsored</span>
          )}
        </div>

        <div className="flex items-center gap-1 mb-6">
          <Star size={18} className="text-amber-400 fill-amber-400" />
          <span className="text-zinc-300 font-medium">{tool.rating}</span>
        </div>

        <p className="text-zinc-300 leading-relaxed mb-6">{tool.description}</p>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Pricing</h3>
          <p className="text-zinc-300">{tool.pricingDetails}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {tool.tags.map((tag) => (
            <span key={tag} className="text-xs bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <a
          href={tool.affiliateUrl || tool.url}
          target="_blank"
          rel="noopener sponsored"
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Visit {tool.name} <ExternalLink size={16} />
        </a>

        {tool.dealText && tool.dealUrl && (
          <a
            href={tool.dealUrl}
            target="_blank"
            rel="noopener sponsored"
            className="inline-flex items-center gap-2 ml-4 bg-purple-500/10 text-purple-400 border border-purple-500/20 px-6 py-3 rounded-lg font-medium hover:bg-purple-500/20 transition-colors"
          >
            {tool.dealText}
          </a>
        )}
      </div>

      {relatedTools.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-6">Related Tools</h2>
          <ToolGrid tools={relatedTools} categories={categories} />
        </section>
      )}
    </div>
  );
}
