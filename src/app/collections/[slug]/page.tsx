import { notFound } from "next/navigation";
import { getCollections, getCollectionBySlug, getToolsForCollection, getCategories } from "@/lib/data";
import { ToolGrid } from "@/components/ToolGrid";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getCollections().map((col) => ({ slug: col.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Collection Not Found" };
  return {
    title: `${collection.title} — AI for Creators`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const tools = getToolsForCollection(collection);
  const categories = getCategories();

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
      <Link href="/collections" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors mb-10">
        <ArrowLeft size={14} /> Back to collections
      </Link>

      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-muted mb-3">{tools.length} tools</p>
        <h1 className="font-serif text-4xl text-ink mb-3">{collection.title}</h1>
        <p className="text-ink-light">{collection.description}</p>
      </div>

      <ToolGrid tools={tools} categories={categories} />
    </div>
  );
}
