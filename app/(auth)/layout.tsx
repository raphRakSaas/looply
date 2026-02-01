import type { ReactNode } from "react";

/**
 * Layout commun aux pages non connectées (login, signup, forgot-password).
 * Pas de sidebar, contenu centré.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
