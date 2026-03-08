# AI Tools Directory — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a curated AI tools directory for content creators with affiliate monetization, deployed free on Vercel.

**Architecture:** Next.js 15 App Router with static site generation. Tool data lives in JSON files under `/data`. Pages are statically generated at build time from this data. Client-side search via Fuse.js. Dark mode default with Tailwind CSS 4.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 4, Lucide React, Fuse.js, Vercel

**Note:** This plan is designed for Ralph Loop execution — each task is self-contained and independently executable.

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

**Step 1: Initialize Next.js project**

Run:
```bash
cd "/Users/swiggis/File Management/03. Projects/Ai for Creators"
npx create-next-app@latest ai-creators-directory --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Accept defaults. This creates the full scaffold.

**Step 2: Install dependencies**

Run:
```bash
cd "/Users/swiggis/File Management/03. Projects/Ai for Creators/ai-creators-directory"
npm install lucide-react fuse.js
```

**Step 3: Initialize git repo**

Run:
```bash
cd "/Users/swiggis/File Management/03. Projects/Ai for Creators/ai-creators-directory"
git init
git add .
git commit -m "chore: scaffold Next.js project with dependencies"
```

**Step 4: Verify it runs**

Run:
```bash
cd "/Users/swiggis/File Management/03. Projects/Ai for Creators/ai-creators-directory"
npm run build
```

Expected: Build succeeds with no errors.

---

### Task 2: Data Layer — Types & JSON Files

**Files:**
- Create: `src/types/index.ts`
- Create: `data/tools.json`
- Create: `data/categories.json`
- Create: `data/collections.json`

**Step 1: Create TypeScript types**

Create `src/types/index.ts`:
```typescript
export type Pricing = "free" | "freemium" | "paid";
export type SkillLevel = "beginner" | "intermediate" | "advanced";

export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  pricing: Pricing;
  pricingDetails: string;
  url: string;
  affiliateUrl: string | null;
  logo: string;
  featured: boolean;
  sponsored: boolean;
  dealText: string | null;
  dealUrl: string | null;
  skillLevel: SkillLevel;
  rating: number;
  addedDate: string;
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
}

export interface Collection {
  slug: string;
  title: string;
  description: string;
  toolSlugs: string[];
}
```

**Step 2: Create seed data — categories.json**

Create `data/categories.json`:
```json
[
  { "slug": "video", "name": "Video Editing & Generation", "icon": "Video" },
  { "slug": "image", "name": "Image Generation & Editing", "icon": "Image" },
  { "slug": "writing", "name": "Writing & Copywriting", "icon": "Pen" },
  { "slug": "audio", "name": "Audio & Music", "icon": "Headphones" },
  { "slug": "design", "name": "Design & UI", "icon": "Palette" },
  { "slug": "social", "name": "Social Media Management", "icon": "Share2" },
  { "slug": "seo", "name": "SEO & Marketing", "icon": "TrendingUp" }
]
```

Note: Icon values match Lucide React component names exactly.

**Step 3: Create seed data — tools.json**

Create `data/tools.json` with 5 sample tools (one per category minimum):
```json
[
  {
    "slug": "runway-ml",
    "name": "Runway ML",
    "tagline": "AI-powered video generation and editing",
    "description": "Professional-grade AI video tools including Gen-3 Alpha for video generation, motion brush, and advanced editing capabilities. Used by major studios and independent creators alike.",
    "category": "video",
    "tags": ["video-generation", "video-editing", "motion-graphics"],
    "pricing": "freemium",
    "pricingDetails": "Free tier with limited credits. Standard plan starts at $12/mo.",
    "url": "https://runwayml.com",
    "affiliateUrl": null,
    "logo": "/logos/runway-ml.png",
    "featured": true,
    "sponsored": false,
    "dealText": null,
    "dealUrl": null,
    "skillLevel": "intermediate",
    "rating": 4.5,
    "addedDate": "2026-03-08"
  },
  {
    "slug": "midjourney",
    "name": "Midjourney",
    "tagline": "Create stunning AI-generated images from text prompts",
    "description": "Industry-leading AI image generation with exceptional artistic quality. Create illustrations, concept art, photorealistic images, and more from text descriptions.",
    "category": "image",
    "tags": ["image-generation", "ai-art", "text-to-image"],
    "pricing": "paid",
    "pricingDetails": "Basic plan starts at $10/mo. Standard at $30/mo.",
    "url": "https://midjourney.com",
    "affiliateUrl": null,
    "logo": "/logos/midjourney.png",
    "featured": true,
    "sponsored": false,
    "dealText": null,
    "dealUrl": null,
    "skillLevel": "beginner",
    "rating": 4.8,
    "addedDate": "2026-03-08"
  },
  {
    "slug": "elevenlabs",
    "name": "ElevenLabs",
    "tagline": "AI voice generation and cloning platform",
    "description": "Create natural-sounding voiceovers, clone voices, and generate speech in multiple languages. Perfect for podcasters, video creators, and audiobook producers.",
    "category": "audio",
    "tags": ["text-to-speech", "voice-cloning", "voiceover"],
    "pricing": "freemium",
    "pricingDetails": "Free tier with 10k characters/mo. Starter at $5/mo.",
    "url": "https://elevenlabs.io",
    "affiliateUrl": null,
    "logo": "/logos/elevenlabs.png",
    "featured": false,
    "sponsored": false,
    "dealText": "20% off annual plans",
    "dealUrl": "https://elevenlabs.io/pricing",
    "skillLevel": "beginner",
    "rating": 4.6,
    "addedDate": "2026-03-08"
  },
  {
    "slug": "jasper-ai",
    "name": "Jasper AI",
    "tagline": "AI writing assistant for marketing and content",
    "description": "Enterprise-grade AI writing platform for creating blog posts, social media content, ad copy, and marketing materials at scale.",
    "category": "writing",
    "tags": ["copywriting", "content-generation", "marketing"],
    "pricing": "paid",
    "pricingDetails": "Creator plan starts at $49/mo. Pro at $69/mo.",
    "url": "https://jasper.ai",
    "affiliateUrl": null,
    "logo": "/logos/jasper-ai.png",
    "featured": false,
    "sponsored": false,
    "dealText": null,
    "dealUrl": null,
    "skillLevel": "beginner",
    "rating": 4.3,
    "addedDate": "2026-03-08"
  },
  {
    "slug": "framer",
    "name": "Framer",
    "tagline": "AI-powered website builder for designers",
    "description": "Design and publish stunning websites with AI-assisted layout generation, copy writing, and responsive design. No coding required.",
    "category": "design",
    "tags": ["web-design", "no-code", "website-builder"],
    "pricing": "freemium",
    "pricingDetails": "Free tier available. Mini at $5/mo. Basic at $15/mo.",
    "url": "https://framer.com",
    "affiliateUrl": null,
    "logo": "/logos/framer.png",
    "featured": false,
    "sponsored": false,
    "dealText": null,
    "dealUrl": null,
    "skillLevel": "beginner",
    "rating": 4.4,
    "addedDate": "2026-03-08"
  }
]
```

**Step 4: Create seed data — collections.json**

Create `data/collections.json`:
```json
[
  {
    "slug": "best-free-ai-tools",
    "title": "Best Free AI Tools for Creators",
    "description": "Top AI tools with generous free tiers — no credit card required to get started.",
    "toolSlugs": ["runway-ml", "elevenlabs", "framer"]
  },
  {
    "slug": "starter-kit-video-creators",
    "title": "AI Starter Kit for Video Creators",
    "description": "Everything you need to start creating AI-enhanced video content.",
    "toolSlugs": ["runway-ml", "elevenlabs", "midjourney"]
  }
]
```

**Step 5: Create data access helpers**

Create `src/lib/data.ts`:
```typescript
import tools from "../../data/tools.json";
import categories from "../../data/categories.json";
import collections from "../../data/collections.json";
import type { Tool, Category, Collection } from "@/types";

export function getTools(): Tool[] {
  return tools as Tool[];
}

export function getToolBySlug(slug: string): Tool | undefined {
  return (tools as Tool[]).find((t) => t.slug === slug);
}

export function getCategories(): Category[] {
  return categories as Category[];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return (categories as Category[]).find((c) => c.slug === slug);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return (tools as Tool[]).filter((t) => t.category === categorySlug);
}

export function getCollections(): Collection[] {
  return collections as Collection[];
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return (collections as Collection[]).find((c) => c.slug === slug);
}

export function getToolsForCollection(collection: Collection): Tool[] {
  return collection.toolSlugs
    .map((slug) => (tools as Tool[]).find((t) => t.slug === slug))
    .filter((t): t is Tool => t !== undefined);
}

export function getFeaturedTools(): Tool[] {
  return (tools as Tool[]).filter((t) => t.featured);
}

export function getSponsoredTools(): Tool[] {
  return (tools as Tool[]).filter((t) => t.sponsored);
}

export function getDeals(): Tool[] {
  return (tools as Tool[]).filter((t) => t.dealText !== null);
}

export function getLatestTools(count: number = 6): Tool[] {
  return [...(tools as Tool[])]
    .sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime())
    .slice(0, count);
}
```

**Step 6: Verify build**

Run:
```bash
npm run build
```

Expected: Build succeeds.

**Step 7: Commit**

```bash
git add .
git commit -m "feat: add data layer with types, seed data, and access helpers"
```

---

### Task 3: Global Layout, Theme & Navigation

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `src/components/Header.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/ThemeToggle.tsx`
- Create: `src/components/LucideIcon.tsx`

**Step 1: Set up dark mode Tailwind config**

Modify `tailwind.config.ts` (or `postcss.config.mjs` / `globals.css` depending on Tailwind v4 setup) to enable `class`-based dark mode. In Tailwind v4 with the new CSS-first config, add the dark mode variant via CSS:

In `src/app/globals.css`, ensure dark mode is handled. Tailwind v4 uses `@custom-variant dark (&:where(.dark, .dark *));` if needed.

**Step 2: Create LucideIcon dynamic component**

Create `src/components/LucideIcon.tsx`:
```typescript
import * as icons from "lucide-react";
import { LucideProps } from "lucide-react";

interface LucideIconProps extends LucideProps {
  name: string;
}

export function LucideIcon({ name, ...props }: LucideIconProps) {
  const Icon = (icons as Record<string, React.ComponentType<LucideProps>>)[name];
  if (!Icon) return null;
  return <Icon {...props} />;
}
```

**Step 3: Create ThemeToggle**

Create `src/components/ThemeToggle.tsx`:
```typescript
"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored ? stored === "dark" : true;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button onClick={toggle} aria-label="Toggle theme" className="p-2 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors">
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
```

**Step 4: Create Header**

Create `src/components/Header.tsx`:
```typescript
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
          <Sparkles size={24} className="text-purple-500" />
          AI for Creators
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/tools" className="text-zinc-400 hover:text-white transition-colors">Browse Tools</Link>
          <Link href="/collections" className="text-zinc-400 hover:text-white transition-colors">Collections</Link>
          <Link href="/deals" className="text-zinc-400 hover:text-white transition-colors">Deals</Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
```

**Step 5: Create Footer**

Create `src/components/Footer.tsx`:
```typescript
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 text-sm text-zinc-400">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/tools" className="hover:text-white transition-colors">Browse Tools</Link>
            <Link href="/deals" className="hover:text-white transition-colors">Deals</Link>
          </div>
          <p className="text-xs text-zinc-500 text-center">
            Some links on this site are affiliate links. We may earn a commission at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 6: Update root layout**

Modify `src/app/layout.tsx`:
```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI for Creators — Curated AI Tools Directory",
  description: "Discover the best AI tools for content creators, designers, and video editors. Curated directory with reviews, deals, and recommendations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

**Step 7: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 8: Commit**

```bash
git add .
git commit -m "feat: add global layout with header, footer, theme toggle, and dark mode"
```

---

### Task 4: ToolCard & ToolGrid Components

**Files:**
- Create: `src/components/ToolCard.tsx`
- Create: `src/components/ToolGrid.tsx`
- Create: `src/components/DealBadge.tsx`
- Create: `src/components/PricingBadge.tsx`
- Create: `src/components/SkillBadge.tsx`
- Create: `src/components/CategoryBadge.tsx`

**Step 1: Create badge components**

Create `src/components/PricingBadge.tsx`:
```typescript
import type { Pricing } from "@/types";

const styles: Record<Pricing, string> = {
  free: "bg-green-500/10 text-green-400 border-green-500/20",
  freemium: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  paid: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const labels: Record<Pricing, string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export function PricingBadge({ pricing }: { pricing: Pricing }) {
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${styles[pricing]}`}>
      {labels[pricing]}
    </span>
  );
}
```

Create `src/components/SkillBadge.tsx`:
```typescript
import type { SkillLevel } from "@/types";

const styles: Record<SkillLevel, string> = {
  beginner: "bg-emerald-500/10 text-emerald-400",
  intermediate: "bg-yellow-500/10 text-yellow-400",
  advanced: "bg-red-500/10 text-red-400",
};

export function SkillBadge({ level }: { level: SkillLevel }) {
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${styles[level]}`}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
}
```

Create `src/components/CategoryBadge.tsx`:
```typescript
import { LucideIcon } from "./LucideIcon";
import type { Category } from "@/types";

const colors: Record<string, string> = {
  video: "text-red-400",
  image: "text-pink-400",
  writing: "text-blue-400",
  audio: "text-purple-400",
  design: "text-cyan-400",
  social: "text-orange-400",
  seo: "text-green-400",
};

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span className={`flex items-center gap-1 text-xs ${colors[category.slug] || "text-zinc-400"}`}>
      <LucideIcon name={category.icon} size={12} />
      {category.name}
    </span>
  );
}
```

Create `src/components/DealBadge.tsx`:
```typescript
import { Tag } from "lucide-react";

export function DealBadge({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-1 text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full">
      <Tag size={10} />
      {text}
    </span>
  );
}
```

**Step 2: Create ToolCard**

Create `src/components/ToolCard.tsx`:
```typescript
import Link from "next/link";
import type { Tool, Category } from "@/types";
import { PricingBadge } from "./PricingBadge";
import { SkillBadge } from "./SkillBadge";
import { CategoryBadge } from "./CategoryBadge";
import { DealBadge } from "./DealBadge";
import { ExternalLink, Star } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
  category: Category;
}

export function ToolCard({ tool, category }: ToolCardProps) {
  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/5">
      {tool.sponsored && (
        <span className="absolute top-3 right-3 text-[10px] text-zinc-500 uppercase tracking-wider">Sponsored</span>
      )}
      <div className="flex items-start gap-4 mb-3">
        <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center text-lg font-bold text-purple-400 shrink-0">
          {tool.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <Link href={`/tools/${tool.slug}`} className="font-semibold text-white hover:text-purple-400 transition-colors block truncate">
            {tool.name}
          </Link>
          <p className="text-sm text-zinc-400 line-clamp-1">{tool.tagline}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 mb-3">
        <Star size={14} className="text-amber-400 fill-amber-400" />
        <span className="text-sm text-zinc-300">{tool.rating}</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <CategoryBadge category={category} />
        <PricingBadge pricing={tool.pricing} />
        <SkillBadge level={tool.skillLevel} />
        {tool.dealText && <DealBadge text={tool.dealText} />}
      </div>
      <a
        href={tool.affiliateUrl || tool.url}
        target="_blank"
        rel="noopener sponsored"
        className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors"
      >
        Visit Tool <ExternalLink size={14} />
      </a>
    </div>
  );
}
```

**Step 3: Create ToolGrid**

Create `src/components/ToolGrid.tsx`:
```typescript
import type { Tool, Category } from "@/types";
import { ToolCard } from "./ToolCard";

interface ToolGridProps {
  tools: Tool[];
  categories: Category[];
}

export function ToolGrid({ tools, categories }: ToolGridProps) {
  const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c]));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} category={categoryMap[tool.category]} />
      ))}
    </div>
  );
}
```

**Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 5: Commit**

```bash
git add .
git commit -m "feat: add ToolCard, ToolGrid, and badge components"
```

---

### Task 5: Homepage

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/CategoryGrid.tsx`
- Create: `src/components/FeaturedBanner.tsx`
- Create: `src/components/Hero.tsx`

**Step 1: Create Hero component**

Create `src/components/Hero.tsx`:
```typescript
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero({ toolCount }: { toolCount: number }) {
  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full px-4 py-1.5 text-sm font-medium">
            <Sparkles size={16} />
            {toolCount}+ AI Tools Curated
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Discover the Best AI Tools for{" "}
          <span className="text-purple-400">Content Creators</span>
        </h1>
        <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
          A curated directory of AI-powered tools for video editors, designers, writers, and creators. Find the perfect tools to supercharge your workflow.
        </p>
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg"
        >
          Browse All Tools
        </Link>
      </div>
    </section>
  );
}
```

**Step 2: Create CategoryGrid**

Create `src/components/CategoryGrid.tsx`:
```typescript
import Link from "next/link";
import { LucideIcon } from "./LucideIcon";
import type { Category } from "@/types";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex flex-col items-center gap-3 p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-purple-500/50 transition-all group"
            >
              <LucideIcon name={cat.icon} size={32} className="text-purple-400 group-hover:text-purple-300 transition-colors" />
              <span className="text-sm text-zinc-300 text-center font-medium">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Create FeaturedBanner**

Create `src/components/FeaturedBanner.tsx`:
```typescript
import type { Tool, Category } from "@/types";
import { ToolGrid } from "./ToolGrid";

interface FeaturedBannerProps {
  tools: Tool[];
  categories: Category[];
}

export function FeaturedBanner({ tools, categories }: FeaturedBannerProps) {
  if (tools.length === 0) return null;
  return (
    <section className="py-16 px-4 bg-zinc-900/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Featured Tools</h2>
        <ToolGrid tools={tools} categories={categories} />
      </div>
    </section>
  );
}
```

**Step 4: Build the homepage**

Modify `src/app/page.tsx`:
```typescript
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FeaturedBanner } from "@/components/FeaturedBanner";
import { ToolGrid } from "@/components/ToolGrid";
import { getTools, getCategories, getFeaturedTools, getLatestTools, getDeals } from "@/lib/data";
import { Tag } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const tools = getTools();
  const categories = getCategories();
  const featured = getFeaturedTools();
  const latest = getLatestTools(6);
  const deals = getDeals();

  return (
    <>
      <Hero toolCount={tools.length} />
      <FeaturedBanner tools={featured} categories={categories} />
      <CategoryGrid categories={categories} />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Latest Additions</h2>
          <ToolGrid tools={latest} categories={categories} />
        </div>
      </section>

      {deals.length > 0 && (
        <section className="py-16 px-4 bg-zinc-900/50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <Tag size={32} className="text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Active Deals</h2>
            <p className="text-zinc-400 mb-6">Save on the best AI tools for creators</p>
            <Link
              href="/deals"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              View All Deals
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
```

**Step 5: Verify build and dev server**

Run: `npm run build`
Expected: Build succeeds with static pages generated.

**Step 6: Commit**

```bash
git add .
git commit -m "feat: add homepage with hero, featured tools, categories, and deals banner"
```

---

### Task 6: Browse Tools Page (Search & Filters)

**Files:**
- Create: `src/app/tools/page.tsx`
- Create: `src/components/SearchAndFilter.tsx`

**Step 1: Create SearchAndFilter client component**

Create `src/components/SearchAndFilter.tsx`:
```typescript
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
```

**Step 2: Create tools page**

Create `src/app/tools/page.tsx`:
```typescript
import { getTools, getCategories } from "@/lib/data";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse AI Tools — AI for Creators",
  description: "Search and filter AI tools for content creators, designers, and video editors.",
};

export default function ToolsPage() {
  const tools = getTools();
  const categories = getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Browse AI Tools</h1>
      <p className="text-zinc-400 mb-8">Discover the perfect AI tools for your creative workflow.</p>
      <SearchAndFilter tools={tools} categories={categories} />
    </div>
  );
}
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 4: Commit**

```bash
git add .
git commit -m "feat: add browse tools page with search and filtering"
```

---

### Task 7: Individual Tool Page

**Files:**
- Create: `src/app/tools/[slug]/page.tsx`

**Step 1: Create tool detail page**

Create `src/app/tools/[slug]/page.tsx`:
```typescript
import { notFound } from "next/navigation";
import { getToolBySlug, getTools, getCategories, getToolsByCategory } from "@/lib/data";
import { ToolGrid } from "@/components/ToolGrid";
import { PricingBadge } from "@/components/PricingBadge";
import { SkillBadge } from "@/components/SkillBadge";
import { CategoryBadge } from "@/components/CategoryBadge";
import { DealBadge } from "@/components/DealBadge";
import { ExternalLink, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getTools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool Not Found" };
  return {
    title: `${tool.name} — AI for Creators`,
    description: tool.tagline,
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const categories = getCategories();
  const category = categories.find((c) => c.slug === tool.category);
  const relatedTools = getToolsByCategory(tool.category)
    .filter((t) => t.slug !== tool.slug)
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/tools" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
        <ArrowLeft size={16} /> Back to all tools
      </Link>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mb-8">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-16 h-16 rounded-xl bg-zinc-800 flex items-center justify-center text-2xl font-bold text-purple-400 shrink-0">
            {tool.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{tool.name}</h1>
            <p className="text-lg text-zinc-400">{tool.tagline}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {category && <CategoryBadge category={category} />}
          <PricingBadge pricing={tool.pricing} />
          <SkillBadge level={tool.skillLevel} />
          {tool.dealText && <DealBadge text={tool.dealText} />}
          {tool.sponsored && (
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider self-center">Sponsored</span>
          )}
        </div>

        <div className="flex items-center gap-1 mb-6">
          <Star size={18} className="text-amber-400 fill-amber-400" />
          <span className="text-zinc-300 font-medium">{tool.rating}</span>
        </div>

        <p className="text-zinc-300 leading-relaxed mb-6">{tool.description}</p>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Pricing</h3>
          <p className="text-zinc-300">{tool.pricingDetails}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {tool.tags.map((tag) => (
            <span key={tag} className="text-xs bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <a
          href={tool.affiliateUrl || tool.url}
          target="_blank"
          rel="noopener sponsored"
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Visit {tool.name} <ExternalLink size={16} />
        </a>

        {tool.dealText && tool.dealUrl && (
          <a
            href={tool.dealUrl}
            target="_blank"
            rel="noopener sponsored"
            className="inline-flex items-center gap-2 ml-4 bg-purple-500/10 text-purple-400 border border-purple-500/20 px-6 py-3 rounded-lg font-medium hover:bg-purple-500/20 transition-colors"
          >
            {tool.dealText}
          </a>
        )}
      </div>

      {relatedTools.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-6">Related Tools</h2>
          <ToolGrid tools={relatedTools} categories={categories} />
        </section>
      )}
    </div>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds with static params generated for each tool.

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add individual tool detail page with related tools"
```

---

### Task 8: Category Page

**Files:**
- Create: `src/app/category/[slug]/page.tsx`

**Step 1: Create category page**

Create `src/app/category/[slug]/page.tsx`:
```typescript
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
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add category page with sponsored tools at top"
```

---

### Task 9: Collections Pages

**Files:**
- Create: `src/app/collections/page.tsx`
- Create: `src/app/collections/[slug]/page.tsx`

**Step 1: Create collections index page**

Create `src/app/collections/page.tsx`:
```typescript
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
```

**Step 2: Create single collection page**

Create `src/app/collections/[slug]/page.tsx`:
```typescript
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
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 4: Commit**

```bash
git add .
git commit -m "feat: add collections index and detail pages"
```

---

### Task 10: Deals Page

**Files:**
- Create: `src/app/deals/page.tsx`

**Step 1: Create deals page**

Create `src/app/deals/page.tsx`:
```typescript
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
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add deals page"
```

---

### Task 11: About Page

**Files:**
- Create: `src/app/about/page.tsx`

**Step 1: Create about page**

Create `src/app/about/page.tsx`:
```typescript
import { Sparkles } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — AI for Creators",
  description: "Learn about AI for Creators and our mission to help content creators discover the best AI tools.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles size={28} className="text-purple-400" />
        <h1 className="text-3xl font-bold text-white">About AI for Creators</h1>
      </div>

      <div className="prose prose-invert prose-zinc max-w-none">
        <p className="text-lg text-zinc-300 leading-relaxed mb-6">
          AI for Creators is a curated directory of AI-powered tools designed for content creators, designers, video editors, writers, and anyone in the creative space.
        </p>
        <p className="text-zinc-400 leading-relaxed mb-6">
          The AI landscape moves fast. New tools launch every week, and it can be overwhelming to keep up. We do the research so you don&apos;t have to — testing, reviewing, and curating the best AI tools to help you create better content, faster.
        </p>
        <p className="text-zinc-400 leading-relaxed mb-6">
          Whether you&apos;re just getting started with AI or you&apos;re a power user looking for the next great tool, you&apos;ll find it here.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4">Affiliate Disclosure</h2>
        <p className="text-zinc-400 leading-relaxed mb-6">
          Some links on this site are affiliate links. This means we may earn a small commission if you sign up for a tool through our link — at no extra cost to you. This helps us keep the site running and continue curating the best tools for creators.
        </p>
        <p className="text-zinc-400 leading-relaxed">
          Our recommendations are never influenced by affiliate partnerships. We only feature tools we genuinely believe are valuable for creators.
        </p>
      </div>

      <div className="mt-12">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          Browse All Tools
        </Link>
      </div>
    </div>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add about page with affiliate disclosure"
```

---

### Task 12: Affiliate Click Tracking API Route

**Files:**
- Create: `src/app/api/click/route.ts`

**Step 1: Create click tracking API route**

Create `src/app/api/click/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  const tool = request.nextUrl.searchParams.get("tool");

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  // Log the click (console for now — can be replaced with analytics service later)
  console.log(`[affiliate-click] tool=${tool} url=${url} timestamp=${new Date().toISOString()}`);

  return NextResponse.redirect(url);
}
```

Note: This is a simple redirect-based tracker. For MVP, console logging is sufficient. Can be upgraded to a proper analytics service post-launch.

**Step 2: Update ToolCard to use click tracking (optional enhancement)**

In `src/components/ToolCard.tsx`, update the affiliate link to route through the API:

Change the `<a>` href from:
```
href={tool.affiliateUrl || tool.url}
```
to:
```
href={`/api/click?tool=${tool.slug}&url=${encodeURIComponent(tool.affiliateUrl || tool.url)}`}
```

Apply the same change in `src/app/tools/[slug]/page.tsx` for both the main CTA and deal link.

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 4: Commit**

```bash
git add .
git commit -m "feat: add affiliate click tracking API route"
```

---

### Task 13: SEO & Metadata

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

**Step 1: Create sitemap**

Create `src/app/sitemap.ts`:
```typescript
import { getTools, getCategories, getCollections } from "@/lib/data";
import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aiforcreators.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getTools().map((tool) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: new Date(tool.addedDate),
  }));

  const categories = getCategories().map((cat) => ({
    url: `${BASE_URL}/category/${cat.slug}`,
    lastModified: new Date(),
  }));

  const collections = getCollections().map((col) => ({
    url: `${BASE_URL}/collections/${col.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/tools`, lastModified: new Date() },
    { url: `${BASE_URL}/collections`, lastModified: new Date() },
    { url: `${BASE_URL}/deals`, lastModified: new Date() },
    { url: `${BASE_URL}/about`, lastModified: new Date() },
    ...tools,
    ...categories,
    ...collections,
  ];
}
```

**Step 2: Create robots.txt**

Create `src/app/robots.ts`:
```typescript
import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aiforcreators.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds, sitemap.xml and robots.txt generated.

**Step 4: Commit**

```bash
git add .
git commit -m "feat: add sitemap and robots.txt for SEO"
```

---

### Task 14: Final Polish & Seed More Tools

**Files:**
- Modify: `data/tools.json`

**Step 1: Add more seed tools to reach ~20**

Add at least 15 more tools to `data/tools.json` covering all categories (social, seo, and more tools in existing categories). Use the same schema. Include a mix of:
- Free, freemium, and paid tools
- Beginner, intermediate, and advanced skill levels
- A few more with `dealText` populated
- At least one with `sponsored: true`

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds with all new static pages generated.

**Step 3: Visual QA**

Run: `npm run dev`
Manually check:
- Homepage renders with all sections
- Browse tools page search works
- Filters work correctly
- Tool detail pages render
- Category pages show correct tools
- Collections pages work
- Deals page shows tools with deals
- Dark/light mode toggle works
- All links open correctly

**Step 4: Commit**

```bash
git add .
git commit -m "feat: add full seed data with 20+ AI tools"
```

---

### Task 15: Deploy to Vercel

**Step 1: Push to GitHub**

```bash
cd "/Users/swiggis/File Management/03. Projects/Ai for Creators/ai-creators-directory"
gh repo create ai-creators-directory --public --source=. --push
```

**Step 2: Deploy to Vercel**

Use `vercel` CLI or connect the GitHub repo via Vercel dashboard. The free tier covers everything we need.

```bash
npx vercel --yes
```

**Step 3: Verify deployment**

Visit the deployed URL and verify all pages work correctly.

**Step 4: Commit any deployment config**

```bash
git add .
git commit -m "chore: add Vercel deployment config"
```
