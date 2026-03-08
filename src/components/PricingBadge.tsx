import type { Pricing } from "@/types";

const styles: Record<Pricing, string> = {
  free: "bg-green-500/10 text-green-400 border-green-500/20",
  freemium: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  paid: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const labels: Record<Pricing, string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export function PricingBadge({ pricing }: { pricing: Pricing }) {
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${styles[pricing]}`}>
      {labels[pricing]}
    </span>
  );
}
