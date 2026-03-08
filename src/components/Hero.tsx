import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero({ toolCount }: { toolCount: number }) {
  return (
    <section className="relative noise-bg overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pt-24 pb-20 md:pt-32 md:pb-28">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-muted mb-6">{toolCount} tools curated</p>
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-ink leading-[1.05] mb-8 max-w-4xl">
          The best AI tools<br />
          for <em className="text-vermillion">content creators</em>
        </h1>
        <p className="text-lg text-ink-light max-w-xl mb-10 leading-relaxed">
          A curated catalog of AI-powered tools for video editors, designers, writers, and creators who care about their craft.
        </p>
        <Link
          href="/tools"
          className="group inline-flex items-center gap-3 bg-ink text-cream px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-ink-light transition-colors"
        >
          Browse the directory
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-rule" />
    </section>
  );
}
