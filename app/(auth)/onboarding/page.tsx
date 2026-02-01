import type { Metadata } from "next";
import { OnboardingForm } from "@/components/features/onboarding/OnboardingForm";
import { requireAuth } from "@/lib/auth/utils";

export const metadata: Metadata = {
  title: "Finaliser mon compte — Looply",
  description: "Quelques informations pour personnaliser votre expérience.",
};

export default async function OnboardingRoute() {
  // S'assure que l'utilisateur est connecté
  await requireAuth();

  return <OnboardingForm />;
}
