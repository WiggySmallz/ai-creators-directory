import type { SkillLevel } from "@/types";

export function SkillBadge({ level }: { level: SkillLevel }) {
  return (
    <span className="text-xs text-ink-faint">
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
}
