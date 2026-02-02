"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { signUp, signInWithGoogle } from "@/lib/auth/actions";
import {
  getPasswordCriteria,
  getPasswordStrength,
  isPasswordValid,
  strengthConfig,
  validatePassword,
} from "@/lib/password";
import { Button } from "@/components/ui/Button";
import { LooplyPrimaryButton } from "@/components/ui/LooplyPrimaryButton";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GoogleIcon } from "../login/GoogleIcon";
import { Check, X } from "lucide-react";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordCriteria = useMemo(() => getPasswordCriteria(password), [password]);
  const passwordStrength = useMemo(() => getPasswordStrength(password), [password]);
  const validPassword = useMemo(
    () => isPasswordValid(passwordCriteria),
    [passwordCriteria]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Veuillez saisir votre email.");
      return;
    }

    if (!password) {
      setError("Veuillez saisir votre mot de passe.");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      const result = await signUp(email.trim(), password);

      if (result?.error) {
        setError(result.error);
        console.error("[Signup] Erreur:", result.error);
        if (result.debug) {
          try {
            const parsed = JSON.parse(result.debug);
            console.error("[Signup] Détails erreur (console navigateur):", parsed);
          } catch {
            console.error("[Signup] Détails erreur (console navigateur):", result.debug);
          }
        }
        setLoading(false);
        return;
      }

      // Redirect handled by signUp action
    } catch {
      setError("Une erreur est survenue. Réessayez.");
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError(null);
    setGoogleLoading(true);

    try {
      const result = await signInWithGoogle();

      if (result?.error) {
        setError(result.error);
        setGoogleLoading(false);
        return;
      }

      // Redirect handled by signInWithGoogle action
    } catch {
      setError("Impossible de créer un compte avec Google. Réessayez.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              Créer mon compte
            </CardTitle>
            <CardDescription>
              Pas de carte bancaire • Configuration en 1 minute
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              {error && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="vous@exemple.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  disabled={loading}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  disabled={loading}
                  required
                />
                {/* Barre de robustesse horizontale (3 segments) */}
                {password.length > 0 && (
                  <div className="space-y-1.5">
                    <div
                      className="flex h-2 w-full gap-0.5 overflow-hidden rounded-full"
                      role="progressbar"
                      aria-valuenow={
                        passwordStrength === "faible"
                          ? 1
                          : passwordStrength === "moyen"
                            ? 2
                            : 3
                      }
                      aria-valuemin={0}
                      aria-valuemax={3}
                      aria-label={`Robustesse du mot de passe : ${strengthConfig[passwordStrength].label}`}
                    >
                      <div
                        className={`h-full flex-1 rounded-l-full transition-colors duration-300 ${
                          passwordStrength === "faible"
                            ? strengthConfig.faible.barClass
                            : passwordStrength === "moyen"
                              ? strengthConfig.moyen.barClass
                              : strengthConfig.robuste.barClass
                        }`}
                      />
                      <div
                        className={`h-full flex-1 transition-colors duration-300 ${
                          passwordStrength === "moyen"
                            ? strengthConfig.moyen.barClass
                            : passwordStrength === "robuste"
                              ? strengthConfig.robuste.barClass
                              : "bg-muted"
                        }`}
                      />
                      <div
                        className={`h-full flex-1 rounded-r-full transition-colors duration-300 ${
                          passwordStrength === "robuste"
                            ? strengthConfig.robuste.barClass
                            : "bg-muted"
                        }`}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className={strengthConfig[passwordStrength].textClass}>
                        {strengthConfig[passwordStrength].label}
                      </span>
                    </div>
                  </div>
                )}
                    {/* Critères en temps réel (affichés dès qu'on tape) */}
                {password.length > 0 && (
                  <>
                    <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                      <li className="flex items-center gap-2">
                        {passwordCriteria.length ? (
                          <Check className="size-3.5 shrink-0 text-emerald-500" aria-hidden />
                        ) : (
                          <X className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
                        )}
                        <span>8 caractères min.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        {passwordCriteria.uppercase ? (
                          <Check className="size-3.5 shrink-0 text-emerald-500" aria-hidden />
                        ) : (
                          <X className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
                        )}
                        <span>1 majuscule</span>
                      </li>
                      <li className="flex items-center gap-2">
                        {passwordCriteria.lowercase ? (
                          <Check className="size-3.5 shrink-0 text-emerald-500" aria-hidden />
                        ) : (
                          <X className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
                        )}
                        <span>1 minuscule</span>
                      </li>
                      <li className="flex items-center gap-2">
                        {passwordCriteria.digit ? (
                          <Check className="size-3.5 shrink-0 text-emerald-500" aria-hidden />
                        ) : (
                          <X className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
                        )}
                        <span>1 chiffre</span>
                      </li>
                    </ul>
                    {/* Check vert quand tout est ok */}
                    {validPassword && (
                      <p className="flex items-center gap-2 text-xs text-emerald-500">
                        <Check className="size-4 shrink-0" aria-hidden />
                        Mot de passe valide
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">
                  Confirmer le mot de passe
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError(null);
                  }}
                  disabled={loading}
                  required
                />
              </div>
              <LooplyPrimaryButton type="submit" disabled={loading}>
                {loading ? (
                  <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  "Créer mon compte"
                )}
              </LooplyPrimaryButton>
            </form>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Ou continuer avec
                </span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignUp}
              disabled={loading || googleLoading}
            >
              {googleLoading ? (
                <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <>
                  <GoogleIcon />
                  Google
                </>
              )}
            </Button>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Déjà un compte ?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Se connecter
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
