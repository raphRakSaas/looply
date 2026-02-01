import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Dashboard — Looply",
  description: "Tableau de bord Looply.",
};

export default function DashboardPage() {
  return (
    <PageContainer>
      <h1
        className="text-xl font-semibold"
        style={{ color: "var(--looply-text)" }}
      >
        Dashboard
      </h1>
      <p
        className="mt-2 text-sm"
        style={{ color: "var(--looply-text-muted)" }}
      >
        Compteurs et actions rapides à venir.
      </p>
    </PageContainer>
  );
}
