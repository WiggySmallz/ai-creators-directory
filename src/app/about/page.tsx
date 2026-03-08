import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — AI for Creators",
  description: "Learn about AI for Creators and our mission to help content creators discover the best AI tools.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-ink-muted mb-3">About</p>
      <h1 className="font-serif text-4xl text-ink mb-10">AI for Creators</h1>

      <div className="space-y-6">
        <p className="text-lg text-ink-light leading-[1.8]">
          This is a curated directory of AI-powered tools for content creators, designers, video editors, writers, and anyone in the creative space.
        </p>
        <p className="text-ink-light leading-[1.8]">
          The AI landscape moves fast. New tools launch every week, and it can be overwhelming to keep up. We do the research so you don&apos;t have to — testing, reviewing, and curating the best AI tools to help you create better content, faster.
        </p>
        <p className="text-ink-light leading-[1.8]">
          Whether you&apos;re just getting started with AI or you&apos;re a power user looking for the next great tool, you&apos;ll find it here.
        </p>
      </div>

      <div className="border-t border-rule mt-12 pt-8">
        <p className="text-xs uppercase tracking-widest text-ink-faint mb-4">Affiliate disclosure</p>
        <div className="space-y-4">
          <p className="text-sm text-ink-muted leading-relaxed">
            Some links on this site are affiliate links. This means we may earn a small commission if you sign up for a tool through our link — at no extra cost to you. This helps us keep the site running and continue curating the best tools for creators.
          </p>
          <p className="text-sm text-ink-muted leading-relaxed">
            Our recommendations are never influenced by affiliate partnerships. We only feature tools we genuinely believe are valuable for creators.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <Link
          href="/tools"
          className="group inline-flex items-center gap-3 bg-ink text-cream px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-ink-light transition-colors"
        >
          Browse the directory
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
