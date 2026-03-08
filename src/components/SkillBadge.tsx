import type { SkillLevel } from "@/types";

const styles: Record<SkillLevel, string> = {
  beginner: "bg-emerald-500/10 text-emerald-400",
  intermediate: "bg-yellow-500/10 text-yellow-400",
  advanced: "bg-red-500/10 text-red-400",
};

export function SkillBadge({ level }: { level: SkillLevel }) {
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${styles[level]}`}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
}
