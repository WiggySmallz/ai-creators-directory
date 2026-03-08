# AI Tools Directory for Content Creators — Design Document

**Date:** 2026-03-08
**Status:** Approved

## Overview

A curated directory of AI-powered tools and websites for content creators, designers, and video editors. The site serves both beginners discovering AI tools and experienced creators looking for new/better options. Monetized through affiliate links, featured/sponsored placements, and a deals section.

## Target Audience

- Beginner content creators discovering AI tools for the first time
- Experienced creators seeking new or better AI-powered tools
- Designers, video editors, writers, social media managers, marketers

## MVP Scope

- 20-50 tool listings across 7+ categories
- Launch fast, iterate based on traffic and feedback

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 15 (App Router) | Static site generation |
| Styling | Tailwind CSS 4 | Utility-first |
| Icons | Lucide React | Consistent icon set |
| Language | TypeScript | Type safety for data models |
| Search | Fuse.js | Client-side fuzzy search |
| Hosting | Vercel (free tier) | Deploys on git push |
| Analytics | Vercel Analytics (free) | Page views, referrers |

## Data Model

All data stored as JSON files in `/data` directory.

### Tool Listing (`/data/tools.json`)

```json
{
  "slug": "runway-ml",
  "name": "Runway ML",
  "tagline": "AI-powered video generation and editing",
  "description": "Professional-grade AI video tools for creators...",
  "category": "video",
  "tags": ["video-generation", "video-editing", "motion-graphics"],
  "pricing": "freemium",
  "pricingDetails": "Free tier available. Pro starts at $12/mo",
  "url": "https://runwayml.com",
  "affiliateUrl": "https://runwayml.com/?ref=yoursite",
  "logo": "/logos/runway-ml.png",
  "featured": false,
  "sponsored": false,
  "dealText": null,
  "dealUrl": null,
  "skillLevel": "beginner",
  "rating": 4.5,
  "addedDate": "2026-03-08"
}
```

### Categories (`/data/categories.json`)

```json
[
  { "slug": "video", "name": "Video Editing & Generation", "icon": "video" },
  { "slug": "image", "name": "Image Generation & Editing", "icon": "image" },
  { "slug": "writing", "name": "Writing & Copywriting", "icon": "pen" },
  { "slug": "audio", "name": "Audio & Music", "icon": "headphones" },
  { "slug": "design", "name": "Design & UI", "icon": "palette" },
  { "slug": "social", "name": "Social Media Management", "icon": "share" },
  { "slug": "seo", "name": "SEO & Marketing", "icon": "trending-up" }
]
```

### Curated Collections (`/data/collections.json`)

```json
[
  {
    "slug": "free-ai-tools",
    "title": "Best Free AI Tools for Creators",
    "description": "Top picks that won't cost you a dime",
    "toolSlugs": ["canva-ai", "capcut", "chatgpt"]
  }
]
```

## Site Architecture

### Pages

| Route | Purpose |
|-------|---------|
| `/` | Homepage: hero, featured tools, category grid, latest additions, deals banner |
| `/tools` | Full directory with search, category/pricing/skill-level filters |
| `/tools/[slug]` | Individual tool page: details, pricing, affiliate CTA, related tools |
| `/category/[slug]` | Category page: filtered tools list |
| `/collections` | All curated collections |
| `/collections/[slug]` | Single collection page |
| `/deals` | Active deals and exclusive discounts |
| `/about` | About the site, story, mission |

### Components

| Component | Purpose |
|-----------|---------|
| `ToolCard` | Logo, name, tagline, category badge, pricing badge, skill level, deal badge |
| `ToolGrid` | Responsive grid of ToolCards |
| `SearchBar` | Fuzzy search across names, tags, descriptions |
| `FilterSidebar` | Category, pricing, skill level filters |
| `AffiliateCTA` | "Visit Tool" button routing through affiliate link |
| `FeaturedBanner` | Sponsored/featured tool highlight section |
| `DealBadge` | Visual indicator for active deals |
| `CategoryGrid` | Lucide icon-based grid for category browsing |

### Navigation

Simple top nav: Home, Browse Tools, Collections, Deals

## Monetization

### 1. Affiliate Links

- Every tool has an `affiliateUrl` field
- CTA button uses affiliate link when available, falls back to `url`
- Links open in new tab with `rel="noopener sponsored"`
- Click tracking via Next.js API route (log and redirect)

### 2. Featured/Sponsored Placements

- `featured: true` — highlighted on homepage, "Featured" badge
- `sponsored: true` — premium card style, top of category pages, "Sponsored" label
- Controlled via JSON flags

### 3. Deals Section

- `dealText` + `dealUrl` populated — appears on `/deals` page
- Deal badge shown on ToolCard site-wide
- High-intent SEO page targeting "AI tool discounts"

### FTC Compliance

- Footer disclosure: "Some links on this site are affiliate links. We may earn a commission at no extra cost to you."
- Sponsored listings clearly labeled with "Sponsored" badge

## Visual Design

- **Theme:** Dark mode default with light mode toggle
- **Layout:** Card-based with generous whitespace
- **Colors:** Dark slate/zinc background, vibrant accent (purple or electric blue) for CTAs
- **Typography:** Inter or Geist (free, clean, modern)
- **Category badges:** Subtle color coding per category

### Homepage Layout

1. Hero — headline, tagline, search bar, tool count
2. Featured/sponsored tools row
3. Category grid (Lucide icons + labels)
4. Latest additions grid
5. Deals banner
6. Footer (affiliate disclosure, about, social links)

## Future Enhancements (Post-MVP)

- Decap CMS for GUI-based listing management
- RSS feed for new tool additions
- Newsletter signup for deal alerts
- User favorites/bookmarks
- Comparison pages (Tool A vs Tool B)
