"use client";

import { LoginBranding } from "./LoginBranding";
import { LoginForm } from "./LoginForm";

/**
 * Compose la page login : zone branding (gauche) + formulaire (droite).
 * Utilisé par app/(auth)/login/page.tsx
 */
export function LoginPage() {
  return (
    <div
      className="flex min-h-screen flex-col md:flex-row font-[family:var(--font-inter)]"
      style={{ backgroundColor: "var(--looply-bg)" }}
    >
      <LoginBranding />
      <div className="flex flex-1 flex-col items-center justify-center px-5 py-8 md:px-10 md:py-12 lg:px-16">
        <LoginForm />
      </div>
    </div>
  );
}
