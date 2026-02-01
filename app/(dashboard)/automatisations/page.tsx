import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Automatisations — Looply",
  description: "Règles et templates d'automatisation.",
};

export default function AutomatisationsPage() {
  return (
    <PageContainer>
      <h1
        className="text-xl font-semibold"
        style={{ color: "var(--looply-text)" }}
      >
        Automatisations
      </h1>
      <p
        className="mt-2 text-sm"
        style={{ color: "var(--looply-text-muted)" }}
      >
        Règles et templates à venir.
      </p>
    </PageContainer>
  );
}
