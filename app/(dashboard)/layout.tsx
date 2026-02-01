import type { ReactNode } from "react";
import { requireAuth } from "@/lib/auth/utils";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

/**
 * Layout de l'espace connecté : sidebar + header.
 * Protège les routes : redirige vers /login si non connecté.
 */
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAuth();

  return (
    <div
      className="flex min-h-screen flex-col md:flex-row font-[family:var(--font-inter)]"
      style={{ backgroundColor: "var(--looply-bg)" }}
    >
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
