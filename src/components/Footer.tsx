import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-rule bg-cream">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-serif italic text-xl text-ink mb-3">AI for Creators</p>
            <p className="text-sm text-ink-muted leading-relaxed">
              A hand-curated directory of AI tools for people who make things.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-ink-faint mb-4">Navigate</p>
            <div className="flex flex-col gap-2">
              <Link href="/tools" className="text-sm text-ink-muted hover:text-ink transition-colors">Directory</Link>
              <Link href="/collections" className="text-sm text-ink-muted hover:text-ink transition-colors">Collections</Link>
              <Link href="/deals" className="text-sm text-ink-muted hover:text-ink transition-colors">Deals</Link>
              <Link href="/about" className="text-sm text-ink-muted hover:text-ink transition-colors">About</Link>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-ink-faint mb-4">Disclosure</p>
            <p className="text-sm text-ink-muted leading-relaxed">
              Some links are affiliate links. We may earn a commission at no extra cost to you.
            </p>
          </div>
        </div>
        <div className="border-t border-rule pt-6">
          <p className="text-xs text-ink-faint">&copy; {new Date().getFullYear()} AI for Creators</p>
        </div>
      </div>
    </footer>
  );
}
