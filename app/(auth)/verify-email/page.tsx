import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MailCheck } from "lucide-react";
import { VerifyEmailContent } from "@/components/features/verify-email/VerifyEmailContent";

export const metadata: Metadata = {
  title: "Vérifiez votre email — Looply",
  description:
    "Un email de confirmation vous a été envoyé. Cliquez sur le lien pour activer votre compte.",
};

type Props = { searchParams: Promise<{ email?: string }> };

export default async function VerifyEmailRoute({ searchParams }: Props) {
  const { email } = await searchParams;
  return (
    <div
      className="flex min-h-svh flex-col items-center justify-center p-6 font-[family:var(--font-inter)] md:p-10"
      style={{ backgroundColor: "var(--looply-bg)" }}
    >
      <div className="w-full max-w-sm">
        <Card className="border-zinc-800 bg-zinc-900">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <MailCheck className="h-6 w-6" aria-hidden />
            </div>
            <CardTitle className="text-2xl text-white">
              Vérifiez votre compte
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Un email de confirmation vous a été envoyé à l’adresse indiquée.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <VerifyEmailContent email={email ?? null} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
