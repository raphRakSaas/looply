"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { createOrganization } from "@/lib/services/organizations";
import { getUser } from "@/lib/auth/utils";

export type SignInResult = { error?: string };

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

export async function signUp(
  email: string,
  password: string
): Promise<SignInResult> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect("/onboarding");
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
