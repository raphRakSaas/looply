import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "RDV — Looply",
  description: "Gestion des rendez-vous.",
};

export default function RdvPage() {
  return (
    <PageContainer>
      <h1
        className="text-xl font-semibold"
        style={{ color: "var(--looply-text)" }}
      >
        Rendez-vous
      </h1>
      <p
        className="mt-2 text-sm"
        style={{ color: "var(--looply-text-muted)" }}
      >
        Liste et filtres RDV à venir.
      </p>
    </PageContainer>
  );
}
