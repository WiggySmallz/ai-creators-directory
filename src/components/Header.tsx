"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-sm">
      <nav className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 border-b border-rule">
          <Link href="/" className="font-serif text-2xl text-ink tracking-tight italic">
            AI for Creators
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/tools" className="text-sm text-ink-muted hover:text-ink editorial-link transition-colors">Directory</Link>
            <Link href="/collections" className="text-sm text-ink-muted hover:text-ink editorial-link transition-colors">Collections</Link>
            <Link href="/deals" className="text-sm text-ink-muted hover:text-ink editorial-link transition-colors">Deals</Link>
            <Link href="/about" className="text-sm text-ink-muted hover:text-ink editorial-link transition-colors">About</Link>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden text-ink" aria-label="Toggle menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <div className="md:hidden border-b border-rule py-4 flex flex-col gap-3">
            <Link href="/tools" onClick={() => setOpen(false)} className="text-sm text-ink-muted hover:text-ink">Directory</Link>
            <Link href="/collections" onClick={() => setOpen(false)} className="text-sm text-ink-muted hover:text-ink">Collections</Link>
            <Link href="/deals" onClick={() => setOpen(false)} className="text-sm text-ink-muted hover:text-ink">Deals</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="text-sm text-ink-muted hover:text-ink">About</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
