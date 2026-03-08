import { getDeals, getCategories } from "@/lib/data";
import { ToolGrid } from "@/components/ToolGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deals & Discounts — AI for Creators",
  description: "Save on the best AI tools for content creators with exclusive deals and discounts.",
};

export default function DealsPage() {
  const deals = getDeals();
  const categories = getCategories();

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-vermillion mb-3">Limited offers</p>
        <h1 className="font-serif text-4xl text-ink mb-3">Deals &amp; discounts</h1>
        <p className="text-ink-light">Save on the best AI tools for creators.</p>
      </div>

      {deals.length > 0 ? (
        <ToolGrid tools={deals} categories={categories} />
      ) : (
        <div className="border border-rule p-12 text-center">
          <p className="text-ink-muted">No active deals right now. Check back soon.</p>
        </div>
      )}
    </div>
  );
}
