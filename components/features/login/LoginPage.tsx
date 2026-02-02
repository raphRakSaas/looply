"use client";

import { LoginBranding } from "./LoginBranding";
import { LoginForm } from "./LoginForm";

/**
 * Page login : gauche = logo sur fond blanc, droite = formulaire centré.
 * Mode sombre forcé pour cette page uniquement.
 */
export function LoginPage() {
  return (
    <div className="dark grid min-h-svh lg:grid-cols-2">
      <LoginBranding />
      <div className="flex flex-col">
        <LoginForm />
      </div>
    </div>
  );
}
