import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap border text-sm font-semibold uppercase tracking-[0.08em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a6ff3d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080b09] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-[#b9ff46]/70 bg-[#b9ff46] text-[#081005] shadow-[0_0_24px_rgba(185,255,70,0.2)] hover:bg-[#d3ff74]",
        secondary:
          "border-[#f08a24]/60 bg-[#f08a24]/10 text-[#ffd0a2] hover:bg-[#f08a24]/20",
        ghost:
          "border-white/10 bg-white/[0.03] text-zinc-100 hover:border-white/25 hover:bg-white/[0.07]",
        danger:
          "border-[#ff4747]/60 bg-[#ff4747]/10 text-[#ffb4b4] hover:bg-[#ff4747]/20",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "px-5",
        lg: "h-12 px-6",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), "clip-corner", className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { buttonVariants };
