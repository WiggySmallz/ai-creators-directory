import { getCollections } from "@/lib/data";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curated Collections — AI for Creators",
  description: "Hand-picked collections of AI tools for specific creator workflows.",
};

export default function CollectionsPage() {
  const collections = getCollections();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Curated Collections</h1>
      <p className="text-zinc-400 mb-8">Hand-picked AI tool bundles for specific creator workflows.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => (
          <Link
            key={col.slug}
            href={`/collections/${col.slug}`}
            className="group bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-purple-500/50 transition-all"
          >
            <BookOpen size={24} className="text-purple-400 mb-4" />
            <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">{col.title}</h2>
            <p className="text-sm text-zinc-400 mb-4">{col.description}</p>
            <span className="flex items-center gap-1 text-sm text-purple-400">
              {col.toolSlugs.length} tools <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
