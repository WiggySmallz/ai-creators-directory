import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FeaturedBanner } from "@/components/FeaturedBanner";
import { ToolGrid } from "@/components/ToolGrid";
import { getTools, getCategories, getFeaturedTools, getLatestTools, getDeals } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const tools = getTools();
  const categories = getCategories();
  const featured = getFeaturedTools();
  const latest = getLatestTools(6);
  const deals = getDeals();

  return (
    <>
      <Hero toolCount={tools.length} />
      <FeaturedBanner tools={featured} categories={categories} />
      <CategoryGrid categories={categories} />

      <section className="py-20 px-6 lg:px-8 border-t border-rule">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-serif text-3xl text-ink">Recently added</h2>
            <Link href="/tools" className="text-sm text-ink-muted hover:text-vermillion editorial-link transition-colors flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <ToolGrid tools={latest} categories={categories} />
        </div>
      </section>

      {deals.length > 0 && (
        <section className="py-20 px-6 lg:px-8 border-t border-rule bg-vermillion-light relative noise-bg overflow-hidden">
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="max-w-lg">
              <p className="text-xs uppercase tracking-[0.2em] text-vermillion mb-4">Limited offers</p>
              <h2 className="font-serif text-3xl text-ink mb-4">Deals &amp; discounts</h2>
              <p className="text-ink-light mb-8 leading-relaxed">
                Save on the best AI tools with exclusive offers and time-limited discounts.
              </p>
              <Link
                href="/deals"
                className="group inline-flex items-center gap-3 bg-vermillion text-white px-7 py-3 text-sm font-medium tracking-wide hover:bg-vermillion-dark transition-colors"
              >
                View all deals
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
