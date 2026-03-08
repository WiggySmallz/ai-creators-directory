export function DealBadge({ text }: { text: string }) {
  return (
    <span className="text-xs font-medium bg-vermillion-light text-vermillion px-2 py-0.5 border border-vermillion/20">
      {text}
    </span>
  );
}
