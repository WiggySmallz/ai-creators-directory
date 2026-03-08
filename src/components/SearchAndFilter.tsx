"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { Search, X } from "lucide-react";
import type { Tool, Category } from "@/types";
import { ToolGrid } from "./ToolGrid";

interface SearchAndFilterProps {
  tools: Tool[];
  categories: Category[];
}

export function SearchAndFilter({ tools, categories }: SearchAndFilterProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPricing, setSelectedPricing] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");

  const fuse = useMemo(
    () => new Fuse(tools, { keys: ["name", "tagline", "description", "tags"], threshold: 0.3 }),
    [tools]
  );

  const filtered = useMemo(() => {
    let results = query ? fuse.search(query).map((r) => r.item) : tools;
    if (selectedCategory) results = results.filter((t) => t.category === selectedCategory);
    if (selectedPricing) results = results.filter((t) => t.pricing === selectedPricing);
    if (selectedSkill) results = results.filter((t) => t.skillLevel === selectedSkill);
    return results;
  }, [query, selectedCategory, selectedPricing, selectedSkill, fuse, tools]);

  const hasFilters = query || selectedCategory || selectedPricing || selectedSkill;

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-300 focus:outline-none focus:border-purple-500"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <select
          value={selectedPricing}
          onChange={(e) => setSelectedPricing(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-300 focus:outline-none focus:border-purple-500"
        >
          <option value="">All Pricing</option>
          <option value="free">Free</option>
          <option value="freemium">Freemium</option>
          <option value="paid">Paid</option>
        </select>
        <select
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-300 focus:outline-none focus:border-purple-500"
        >
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {hasFilters && (
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-zinc-400">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
          <button onClick={() => { setQuery(""); setSelectedCategory(""); setSelectedPricing(""); setSelectedSkill(""); }} className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300">
            <X size={12} /> Clear filters
          </button>
        </div>
      )}

      <ToolGrid tools={filtered} categories={categories} />
    </div>
  );
}
