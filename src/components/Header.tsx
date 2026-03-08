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
