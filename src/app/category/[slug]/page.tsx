import { notFound } from "next/navigation";
import { getCategories, getCategoryBySlug, getToolsByCategory } from "@/lib/data";
import { ToolGrid } from "@/components/ToolGrid";
import { LucideIcon } from "@/components/LucideIcon";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getCategories().map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} — AI for Creators`,
    description: `Discover the best AI tools for ${category.name.toLowerCase()}.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categories = getCategories();
  const tools = getToolsByCategory(slug);
  const sponsored = tools.filter((t) => t.sponsored);
  const regular = tools.filter((t) => !t.sponsored);

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
      <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors mb-10">
        <ArrowLeft size={14} /> Back to directory
      </Link>

      <div className="flex items-center gap-4 mb-10">
        <LucideIcon name={category.icon} size={28} strokeWidth={1.5} className="text-vermillion" />
        <div>
          <h1 className="font-serif text-4xl text-ink">{category.name}</h1>
          <p className="text-ink-muted">{tools.length} tool{tools.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {sponsored.length > 0 && (
        <div className="mb-8">
          <ToolGrid tools={sponsored} categories={categories} />
        </div>
      )}

      <ToolGrid tools={regular} categories={categories} />
    </div>
  );
}
