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
