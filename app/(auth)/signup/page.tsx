import type { Metadata } from "next";
import { SignupForm } from "@/components/features/signup/SignupForm";

export const metadata: Metadata = {
  title: "Créer un compte — Looply",
  description: "Créez votre compte Looply pour automatiser vos rappels et relances.",
};

export default function SignupRoute() {
  return <SignupForm />;
}
