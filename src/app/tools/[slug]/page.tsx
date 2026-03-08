import { notFound } from "next/navigation";
import { getToolBySlug, getTools, getCategories, getToolsByCategory } from "@/lib/data";
import { ToolGrid } from "@/components/ToolGrid";
import { CategoryBadge } from "@/components/CategoryBadge";
import { PricingBadge } from "@/components/PricingBadge";
import { DealBadge } from "@/components/DealBadge";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
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
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
      <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors mb-10">
        <ArrowLeft size={14} /> Back to directory
      </Link>

      <article>
        <div className="flex items-start gap-5 mb-8">
          <div className="w-14 h-14 bg-surface border border-rule flex items-center justify-center shrink-0 overflow-hidden">
            <Image src={tool.logo} alt={`${tool.name} logo`} width={56} height={56} className="object-contain" />
          </div>
          <div>
            {category && <CategoryBadge category={category} />}
            <h1 className="font-serif text-4xl text-ink mt-1 mb-2">{tool.name}</h1>
            <p className="text-lg text-ink-light">{tool.tagline}</p>
          </div>
        </div>

        <div className="border-t border-b border-rule py-4 mb-8 flex items-center gap-4 flex-wrap">
          <PricingBadge pricing={tool.pricing} />
          <span className="text-rule">|</span>
          <span className="text-sm text-ink-muted">{tool.skillLevel.charAt(0).toUpperCase() + tool.skillLevel.slice(1)} level</span>
          <span className="text-rule">|</span>
          <span className="text-sm text-ink-muted tabular-nums">{tool.rating} rating</span>
          {tool.dealText && (
            <>
              <span className="text-rule">|</span>
              <DealBadge text={tool.dealText} />
            </>
          )}
          {tool.sponsored && (
            <span className="text-[10px] uppercase tracking-widest text-ink-faint ml-auto">Sponsored</span>
          )}
        </div>

        <div className="mb-8">
          <p className="text-ink-light leading-[1.8] text-base">{tool.description}</p>
        </div>

        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-ink-faint mb-2">Pricing details</p>
          <p className="text-ink-light">{tool.pricingDetails}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {tool.tags.map((tag) => (
            <span key={tag} className="text-xs border border-rule text-ink-muted px-2.5 py-1">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={tool.affiliateUrl || tool.url}
            target="_blank"
            rel="noopener sponsored"
            className="group inline-flex items-center gap-2 bg-ink text-cream px-7 py-3 text-sm font-medium tracking-wide hover:bg-ink-light transition-colors"
          >
            Visit {tool.name} <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {tool.dealText && tool.dealUrl && (
            <a
              href={tool.dealUrl}
              target="_blank"
              rel="noopener sponsored"
              className="inline-flex items-center gap-2 border border-vermillion text-vermillion px-7 py-3 text-sm font-medium hover:bg-vermillion hover:text-white transition-colors"
            >
              {tool.dealText}
            </a>
          )}
        </div>
      </article>

      {relatedTools.length > 0 && (
        <section className="mt-20 pt-12 border-t border-rule">
          <h2 className="font-serif text-2xl text-ink mb-8">More in {category?.name}</h2>
          <ToolGrid tools={relatedTools} categories={categories} />
        </section>
      )}
    </div>
  );
}
