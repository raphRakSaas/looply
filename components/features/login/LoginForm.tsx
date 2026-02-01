"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldContent,
  FieldSeparator,
  FieldError,
} from "@/components/ui/field";
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

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center px-6 py-10 md:px-10">
        <div className="w-full max-w-[360px]">
          <Card className="border-0 shadow-none">
            <CardHeader className="space-y-1 px-0 pt-0 text-center">
              <CardTitle className="text-xl font-semibold">
                Connexion à Looply
              </CardTitle>
              <CardDescription className="text-center">
                Ravi de vous revoir. Connectez-vous pour continuer.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                <FieldGroup>
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <FieldContent>
                      <Input
                        type="email"
                        autoComplete="email"
                        placeholder="vous@exemple.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError(null);
                          setFieldError(null);
                        }}
                        disabled={loading}
                        className={
                          fieldError === "email" ? "border-destructive" : ""
                        }
                      />
                      {fieldError === "email" && error && (
                        <FieldError errors={[{ message: error }]} />
                      )}
                    </FieldContent>
                  </Field>
                  <Field>
                    <div className="flex items-center justify-between">
                      <FieldLabel>Mot de passe</FieldLabel>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-primary hover:underline"
                      >
                        Mot de passe oublié ?
                      </Link>
                    </div>
                    <FieldContent>
                      <Input
                        type="password"
                        autoComplete={
                          remember ? "current-password" : "off"
                        }
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError(null);
                          setFieldError(null);
                        }}
                        disabled={loading}
                        className={
                          fieldError === "password"
                            ? "border-destructive"
                            : ""
                        }
                      />
                      {fieldError === "password" && error && (
                        <FieldError errors={[{ message: error }]} />
                      )}
                    </FieldContent>
                  </Field>
                </FieldGroup>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    disabled={loading}
                    className="size-4 rounded border-input"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-muted-foreground"
                  >
                    Se souvenir de moi
                  </label>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <span
                      className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                      aria-hidden
                    />
                  ) : (
                    "Se connecter"
                  )}
                </Button>
              </form>
              <div className="my-6 flex items-center justify-center gap-2">
                <span className="flex-1 border-t border-border" aria-hidden="true" />
                <span className="px-2 text-sm font-semibold text-muted-foreground tracking-wide">OU</span>
                <span className="flex-1 border-t border-border" aria-hidden="true" />
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                size="lg"
              >
                <GoogleIcon />
                Continuer avec Google
              </Button>
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Pas de compte ?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary hover:underline"
                >
                  Créer un compte
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {toast && (
        <div
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-lg"
          style={{ animation: "looply-card-enter 250ms ease-out" }}
        >
          Connexion réussie
        </div>
      )}
    </>
  );
}
