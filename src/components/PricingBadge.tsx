import type { Pricing } from "@/types";

const labels: Record<Pricing, string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export function PricingBadge({ pricing }: { pricing: Pricing }) {
  return (
    <span className="text-xs text-ink-muted border border-rule px-2 py-0.5">
      {labels[pricing]}
    </span>
  );
}
