import Link from "next/link";
import { LucideIcon } from "./LucideIcon";
import type { Category } from "@/types";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="font-serif text-3xl text-ink">By category</h2>
          <Link href="/tools" className="text-sm text-ink-muted hover:text-vermillion editorial-link transition-colors">View all</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-px bg-rule border border-rule">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex flex-col items-center gap-3 p-6 bg-cream hover:bg-cream-dark transition-colors group"
            >
              <LucideIcon name={cat.icon} size={24} strokeWidth={1.5} className="text-ink-muted group-hover:text-vermillion transition-colors" />
              <span className="text-xs text-ink-muted text-center leading-tight">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
