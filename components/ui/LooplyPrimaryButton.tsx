"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const looplyGradient =
  "linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #06B6D4 100%)";

interface LooplyPrimaryButtonProps
  extends React.ComponentProps<"button"> {
  asChild?: boolean;
}

function LooplyPrimaryButton({
  className,
  asChild = false,
  children,
  disabled,
  ...props
}: LooplyPrimaryButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="looply-primary-button"
      disabled={disabled}
      className={cn(
        "relative inline-flex h-10 w-full min-w-0 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-sm font-semibold text-white duration-200",
        "shadow-[0_4px_14px_0_rgba(124,58,237,0.4)]",
        "hover:shadow-[0_6px_20px_0_rgba(6,182,212,0.35)] hover:-translate-y-0.5",
        "active:translate-y-0 active:shadow-[0_2px_10px_0_rgba(124,58,237,0.35)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900",
        "disabled:pointer-events-none disabled:opacity-50 disabled:translate-y-0",
        className
      )}
      style={{
        background: looplyGradient,
        backgroundSize: "200% 200%",
        backgroundPosition: "0% 50%",
        transition: "background-position 0.4s ease, box-shadow 0.2s ease, transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.backgroundPosition = "100% 50%";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundPosition = "0% 50%";
      }}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </Comp>
  );
}

export { LooplyPrimaryButton };
