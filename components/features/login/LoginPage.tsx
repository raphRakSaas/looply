"use client";

import { LoginBranding } from "./LoginBranding";
import { LoginForm } from "./LoginForm";

/**
 * Page login : gauche = logo sur fond blanc, droite = formulaire sur fond sombre.
 * Mode sombre forcé uniquement sur la partie droite (formulaire).
 */
export function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <LoginBranding />
      <div className="dark flex flex-col bg-zinc-950">
        <LoginForm />
      </div>
    </div>
  );
}
