import type { HTMLAttributes } from "react";

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PageContainer({
  children,
  className = "",
  ...props
}: PageContainerProps) {
  return (
    <div className={`flex-1 p-6 md:p-8 ${className}`} {...props}>
      {children}
    </div>
  );
}
