import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeVariant = "green" | "orange" | "red" | "neutral";

const variants: Record<BadgeVariant, string> = {
  green: "border-[#b9ff46]/50 bg-[#b9ff46]/10 text-[#d8ff9a]",
  orange: "border-[#f08a24]/50 bg-[#f08a24]/10 text-[#ffd0a2]",
  red: "border-[#ff4747]/50 bg-[#ff4747]/10 text-[#ffb4b4]",
  neutral: "border-white/15 bg-white/[0.04] text-zinc-300",
};

export function Badge({
  className,
  variant = "neutral",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em]",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
