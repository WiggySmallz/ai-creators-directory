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
