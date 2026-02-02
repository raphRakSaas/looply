"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/**
 * Affiche le ThemeToggle uniquement en dehors de /login.
 * Utilisé dans le layout auth pour signup, verify-email, forgot-password, onboarding.
 */
export function ThemeToggleOrNull() {
  const pathname = usePathname();
  if (pathname === "/login") return null;
  return (
    <div className="absolute right-4 top-4 z-10">
      <ThemeToggle />
    </div>
  );
}
