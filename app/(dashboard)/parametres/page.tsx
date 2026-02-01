import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Paramètres — Looply",
  description: "Paramètres de l'entreprise et de l'abonnement.",
};

export default function ParametresPage() {
  return (
    <PageContainer>
      <h1
        className="text-xl font-semibold"
        style={{ color: "var(--looply-text)" }}
      >
        Paramètres
      </h1>
      <p
        className="mt-2 text-sm"
        style={{ color: "var(--looply-text-muted)" }}
      >
        Entreprise, canaux, abonnement à venir.
      </p>
    </PageContainer>
  );
}
