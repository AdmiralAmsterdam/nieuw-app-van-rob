import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function GlassCard({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-glass border border-glass-border bg-glass-white shadow-glass backdrop-blur-glass backdrop-saturate-[180%]",
        className
      )}
    >
      {children}
    </div>
  );
}
