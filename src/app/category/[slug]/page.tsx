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
    title: `${category.name} AI Tools — AI for Creators`,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/tools" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
        <ArrowLeft size={16} /> Back to all tools
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <LucideIcon name={category.icon} size={36} className="text-purple-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">{category.name}</h1>
          <p className="text-zinc-400">{tools.length} tool{tools.length !== 1 ? "s" : ""}</p>
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
