import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FeaturedBanner } from "@/components/FeaturedBanner";
import { ToolGrid } from "@/components/ToolGrid";
import { getTools, getCategories, getFeaturedTools, getLatestTools, getDeals } from "@/lib/data";
import { Tag } from "lucide-react";
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

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Latest Additions</h2>
          <ToolGrid tools={latest} categories={categories} />
        </div>
      </section>

      {deals.length > 0 && (
        <section className="py-16 px-4 bg-zinc-900/50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <Tag size={32} className="text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Active Deals</h2>
            <p className="text-zinc-400 mb-6">Save on the best AI tools for creators</p>
            <Link
              href="/deals"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              View All Deals
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
