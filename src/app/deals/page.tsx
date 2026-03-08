import { getDeals, getCategories } from "@/lib/data";
import { ToolGrid } from "@/components/ToolGrid";
import { Tag } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tool Deals & Discounts — AI for Creators",
  description: "Save on the best AI tools for content creators with exclusive deals and discounts.",
};

export default function DealsPage() {
  const deals = getDeals();
  const categories = getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-2">
        <Tag size={28} className="text-purple-400" />
        <h1 className="text-3xl font-bold text-white">Deals & Discounts</h1>
      </div>
      <p className="text-zinc-400 mb-8">Save on the best AI tools for creators.</p>

      {deals.length > 0 ? (
        <ToolGrid tools={deals} categories={categories} />
      ) : (
        <p className="text-zinc-500 text-center py-12">No active deals right now. Check back soon!</p>
      )}
    </div>
  );
}
