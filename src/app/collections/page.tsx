import { getCollections } from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections — AI for Creators",
  description: "Hand-picked collections of AI tools for specific creator workflows.",
};

export default function CollectionsPage() {
  const collections = getCollections();

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-muted mb-3">Collections</p>
        <h1 className="font-serif text-4xl text-ink mb-3">Curated toolkits</h1>
        <p className="text-ink-light">Hand-picked AI tool bundles for specific creator workflows.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-rule border border-rule">
        {collections.map((col) => (
          <Link
            key={col.slug}
            href={`/collections/${col.slug}`}
            className="group bg-cream p-8 hover:bg-cream-dark transition-colors"
          >
            <p className="text-xs text-ink-faint mb-3">{col.toolSlugs.length} tools</p>
            <h2 className="font-serif text-2xl text-ink mb-2 group-hover:text-vermillion transition-colors">{col.title}</h2>
            <p className="text-sm text-ink-muted mb-6 leading-relaxed">{col.description}</p>
            <span className="inline-flex items-center gap-1 text-sm text-vermillion font-medium">
              Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
