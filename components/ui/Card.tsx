import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl px-6 py-8 shadow-lg md:px-8 md:py-10 ${className}`}
      style={{
        backgroundColor: "var(--looply-card)",
        border: "1px solid var(--looply-border)",
      }}
      {...props}
    >
      {children}
    </div>
  );
}
