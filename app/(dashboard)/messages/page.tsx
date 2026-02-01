import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Messages — Looply",
  description: "Historique des envois.",
};

export default function MessagesPage() {
  return (
    <PageContainer>
      <h1
        className="text-xl font-semibold"
        style={{ color: "var(--looply-text)" }}
      >
        Messages
      </h1>
      <p
        className="mt-2 text-sm"
        style={{ color: "var(--looply-text-muted)" }}
      >
        Historique des envois à venir.
      </p>
    </PageContainer>
  );
}
