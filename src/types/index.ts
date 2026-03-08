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
