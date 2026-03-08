import * as icons from "lucide-react";
import type { LucideProps } from "lucide-react";

interface LucideIconProps extends Omit<LucideProps, "ref"> {
  name: string;
}

export function LucideIcon({ name, ...props }: LucideIconProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (icons as unknown as Record<string, React.ComponentType<any>>)[name];
  if (!Icon) return null;
  return <Icon {...props} />;
}
