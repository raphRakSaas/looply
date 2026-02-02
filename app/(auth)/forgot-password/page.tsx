import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mot de passe oublié — Looply",
  description: "Réinitialisez votre mot de passe Looply.",
};

export default function ForgotPasswordRoute() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background font-[family:var(--font-inter)]">
      <p className="text-muted-foreground">
        Page mot de passe oublié à venir.
      </p>
      <Link
        href="/login"
        className="mt-4 text-sm font-medium text-primary hover:underline"
      >
        Retour à la connexion
      </Link>
    </div>
  );
}
