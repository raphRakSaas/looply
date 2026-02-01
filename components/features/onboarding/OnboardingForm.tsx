"use client";

import { useState } from "react";
import { completeOnboarding } from "@/lib/auth/actions";
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

export function OnboardingForm() {
  const [activityName, setActivityName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!activityName.trim()) {
      setError("Veuillez saisir le nom de votre activité.");
      return;
    }

    setLoading(true);

    try {
      const result = await completeOnboarding(activityName.trim());

      if (result?.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      // Redirect handled by completeOnboarding action
    } catch {
      setError("Une erreur est survenue. Réessayez.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card className="border-zinc-800 bg-zinc-900">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">
              Quel est le nom de votre activité ?
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Nous l&apos;utiliserons pour personnaliser vos messages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-6">
              {error && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="activity-name" className="text-zinc-200">
                  Nom de l&apos;activité
                </Label>
                <Input
                  id="activity-name"
                  type="text"
                  autoComplete="organization"
                  placeholder="Studio Mia"
                  value={activityName}
                  onChange={(e) => {
                    setActivityName(e.target.value);
                    setError(null);
                  }}
                  disabled={loading}
                  required
                  autoFocus
                  className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500"
                />
                <p className="text-xs text-zinc-500">
                  Exemples : Studio Mia, Garage ABC, Coach Sam
                </p>
              </div>
              <LooplyPrimaryButton type="submit" disabled={loading}>
                {loading ? (
                  <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  "Continuer"
                )}
              </LooplyPrimaryButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
