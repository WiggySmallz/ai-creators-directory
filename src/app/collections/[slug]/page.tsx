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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/collections" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
        <ArrowLeft size={16} /> Back to collections
      </Link>

      <h1 className="text-3xl font-bold text-white mb-2">{collection.title}</h1>
      <p className="text-zinc-400 mb-8">{collection.description}</p>

      <ToolGrid tools={tools} categories={categories} />
    </div>
  );
}
