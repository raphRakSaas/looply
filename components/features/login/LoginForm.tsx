"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "@/lib/auth/actions";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GoogleIcon } from "./GoogleIcon";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<"email" | "password" | null>(
    null
  );
  const [toast, setToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldError(null);

    if (!email.trim()) {
      setFieldError("email");
      setError("Veuillez saisir votre email.");
      return;
    }
    if (!password) {
      setFieldError("password");
      setError("Veuillez saisir votre mot de passe.");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn(email.trim(), password);

      if (result?.error) {
        setFieldError("password");
        setError(result.error);
        setLoading(false);
        return;
      }

      setToast(true);
    } catch {
      setFieldError("password");
      setError("Une erreur est survenue. Réessayez.");
      setLoading(false);
    }
  };

  const cardEnterStyle = {
    animation: "looply-card-enter 280ms ease-out forwards",
    opacity: 0,
  };

  return (
    <>
      <div
        className="w-full max-w-[400px] rounded-2xl px-6 py-8 shadow-lg md:px-8 md:py-10"
        style={cardEnterStyle}
      >
        <Card className="!rounded-2xl !p-0 !shadow-none">
          <h1
            className="text-xl font-semibold md:text-2xl"
            style={{ color: "var(--looply-text)" }}
          >
            Connexion à Looply
          </h1>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--looply-text-muted)" }}
          >
            Ravi de vous revoir. Connectez-vous pour continuer.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 md:mt-8">
            <div className="space-y-5">
              <Input
                label="Email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                  setFieldError(null);
                }}
                disabled={loading}
                placeholder="vous@exemple.com"
                error={fieldError === "email" ? error ?? undefined : undefined}
              />
              <Input
                label="Mot de passe"
                type="password"
                autoComplete={remember ? "current-password" : "off"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                  setFieldError(null);
                }}
                disabled={loading}
                placeholder="••••••••"
                error={
                  fieldError === "password" ? error ?? undefined : undefined
                }
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  disabled={loading}
                  className="h-4 w-4 rounded border-gray-300 text-[var(--looply-accent)] focus:ring-[var(--looply-accent)]"
                />
                <span style={{ color: "var(--looply-text-muted)" }}>
                  Se souvenir de moi
                </span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium outline-none hover:underline focus:underline"
                style={{ color: "var(--looply-accent)" }}
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <Button
              type="submit"
              loading={loading}
              variant="primary"
              className="mt-6 h-11 w-full rounded-lg"
              style={{
                backgroundColor: "var(--looply-accent)",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              Se connecter
            </Button>
          </form>

          <div
            className="my-6 flex items-center gap-3 text-sm"
            style={{ color: "var(--looply-text-muted)" }}
          >
            <span className="h-px flex-1 bg-[var(--looply-border)]" />
            <span>ou</span>
            <span className="h-px flex-1 bg-[var(--looply-border)]" />
          </div>

          <button
            type="button"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border font-medium outline-none transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-[var(--looply-accent)]"
            style={{
              borderColor: "var(--looply-border)",
              color: "var(--looply-text)",
            }}
          >
            <GoogleIcon />
            Continuer avec Google
          </button>

          <p
            className="mt-6 text-center text-sm"
            style={{ color: "var(--looply-text-muted)" }}
          >
            Pas de compte ?{" "}
            <Link
              href="/signup"
              className="font-medium hover:underline"
              style={{ color: "var(--looply-accent)" }}
            >
              Créer un compte
            </Link>
          </p>
        </Card>
      </div>

      {toast && (
        <div
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-lg"
          style={{
            backgroundColor: "var(--looply-success)",
            animation: "looply-card-enter 250ms ease-out",
          }}
        >
          Connexion réussie
        </div>
      )}
    </>
  );
}
