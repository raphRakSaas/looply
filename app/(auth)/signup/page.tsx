import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Créer un compte — Looply",
  description: "Créez votre compte Looply pour automatiser vos rappels et relances.",
};

export default function SignupRoute() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center font-[family:var(--font-inter)]"
      style={{ backgroundColor: "var(--looply-bg)" }}
    >
      <p style={{ color: "var(--looply-text-muted)" }}>
        Page d&apos;inscription à venir.
      </p>
      <Link
        href="/login"
        className="mt-4 text-sm font-medium"
        style={{ color: "var(--looply-accent)" }}
      >
        Retour à la connexion
      </Link>
    </div>
  );
}
