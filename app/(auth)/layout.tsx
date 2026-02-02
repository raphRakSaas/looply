import type { ReactNode } from "react";
import { ThemeToggleOrNull } from "@/components/layout/ThemeToggleOrNull";

/**
 * Layout commun aux pages non connectées (login, signup, forgot-password).
 * Pas de sidebar, contenu centré.
 * Bascule thème affichée sur toutes les pages sauf /login.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeToggleOrNull />
      {children}
    </>
  );
}
