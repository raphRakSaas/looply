"use client";

import { LoginBranding } from "./LoginBranding";
import { LoginForm } from "./LoginForm";

/**
 * Page login : gauche = logo sur fond blanc, droite = formulaire centré.
 */
export function LoginPage() {
  return (
    <div className="grid min-h-svh font-[family:var(--font-inter)] lg:grid-cols-2">
      <LoginBranding />
      <div className="flex flex-col bg-muted/30">
        <LoginForm />
      </div>
    </div>
  );
}
