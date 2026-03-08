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
