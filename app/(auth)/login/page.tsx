import type { Metadata } from "next";
import { LoginPage } from "@/components/features/login/LoginPage";

export const metadata: Metadata = {
  title: "Connexion — Looply",
  description:
    "Connectez-vous à Looply pour gérer vos rappels et relances. Un login, et vous reprenez le contrôle.",
};

export default function LoginRoute() {
  return <LoginPage />;
}
