"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { createOrganization } from "@/lib/services/organizations";
import { getUser } from "@/lib/auth/utils";

export type SignInResult = {
  error?: string;
  /** Détails bruts pour la console navigateur (uniquement en dev) */
  debug?: string;
};

export async function signIn(
  email: string,
  password: string
): Promise<SignInResult> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

/**
 * Message utilisateur pour les erreurs Supabase connues (ex. 500 / unexpected_failure).
 */
function normalizeSignUpError(message: string): string {
  const lower = message.toLowerCase();
  if (
    lower.includes("unexpected_failure") ||
    lower.includes("unexpected failure") ||
    lower.includes("internal server error") ||
    lower.includes("500")
  ) {
    return "Le service est temporairement indisponible. Réessayez dans quelques instants.";
  }
  if (
    lower.includes("database error") &&
    (lower.includes("updating user") || lower.includes("saving new user"))
  ) {
    return "Erreur lors de la création du compte. Réessayez dans quelques instants.";
  }
  if (lower.includes("email") && lower.includes("already")) {
    return "Un compte existe déjà avec cet email.";
  }
  if (lower.includes("rate limit") || lower.includes("too many")) {
    return "Trop de tentatives. Réessayez plus tard.";
  }
  return message;
}

export async function signUp(
  email: string,
  password: string
): Promise<SignInResult> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({ email: email.trim(), password: password.trim() });

    console.log("[signUp] Data:", data);
    if (error) {
      // Log serveur (terminal Next.js)
      console.log("[signUp] Erreur Supabase:", {
        message: error.message,
        status: error.status,
        name: error.name,
        code: (error as { code?: string }).code,
        details: (error as { details?: string }).details,
      });
      const debugPayload =
        process.env.NODE_ENV === "development"
          ? JSON.stringify({
              message: error.message,
              status: error.status,
              name: error.name,
              code: (error as { code?: string }).code,
              details: (error as { details?: string }).details,
            })
          : undefined;
      return {
        error: normalizeSignUpError(error.message),
        ...(debugPayload && { debug: debugPayload }),
      };
    }
  } catch (err) {
    console.error("[signUp] Exception:", err);
    const debugPayload =
      process.env.NODE_ENV === "development" && err instanceof Error
        ? err.message
        : process.env.NODE_ENV === "development"
          ? String(err)
          : undefined;
    return {
      error: "Le service est temporairement indisponible. Réessayez dans quelques instants.",
      ...(debugPayload && { debug: debugPayload }),
    };
  }

  redirect(`/verify-email?email=${encodeURIComponent(email.trim())}`);
}

export type ResendConfirmationResult = { error?: string };

export async function resendConfirmationEmail(
  email: string
): Promise<ResendConfirmationResult> {
  const trimmed = email?.trim();
  if (!trimmed) {
    return { error: "Email manquant." };
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.resend({
    type: "signup",
    email: trimmed,
  });
  if (error) {
    if (error.message.toLowerCase().includes("rate limit")) {
      return { error: "Trop de tentatives. Réessayez dans quelques minutes." };
    }
    return { error: "Impossible de renvoyer l’email. Réessayez plus tard." };
  }
  return {};
}

export async function signInWithGoogle(): Promise<SignInResult> {
  const supabase = await createClient();
  
  const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/auth/callback`;
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }

  return { error: "Impossible de démarrer la connexion avec Google." };
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function resetPassword(email: string): Promise<SignInResult> {
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return {};
}

export type CompleteOnboardingResult = { error?: string };

export async function completeOnboarding(
  activityName: string
): Promise<CompleteOnboardingResult> {
  try {
    const user = await getUser();

    if (!user) {
      return { error: "Utilisateur non connecté." };
    }

    if (!activityName || !activityName.trim()) {
      return { error: "Le nom de l'activité est requis." };
    }

    await createOrganization(user.id, {
      name: activityName.trim(),
    });

    redirect("/dashboard");
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Une erreur est survenue." };
  }
}
