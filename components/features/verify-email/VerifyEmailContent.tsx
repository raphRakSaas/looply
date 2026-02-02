"use client";

import { useState } from "react";
import Link from "next/link";
import { resendConfirmationEmail } from "@/lib/auth/actions";
import { LooplyPrimaryButton } from "@/components/ui/LooplyPrimaryButton";

type Props = { email: string | null };

export function VerifyEmailContent({ email }: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<"success" | "error" | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleResend = async () => {
    if (!email?.trim()) return;
    setLoading(true);
    setMessage(null);
    setErrorText(null);
    const result = await resendConfirmationEmail(email.trim());
    setLoading(false);
    if (result?.error) {
      setMessage("error");
      setErrorText(result.error);
    } else {
      setMessage("success");
    }
  };

  return (
    <>
      <p className="text-sm text-foreground">
        Consultez votre boîte de réception (et vos spams) puis cliquez sur le
        lien d'activation pour activer votre compte.
      </p>

      {message === "success" && (
        <p className="rounded-lg bg-emerald-500/20 p-3 text-sm text-emerald-600 dark:text-emerald-400">
          Un nouvel email vous a été envoyé. Vérifiez votre boîte de réception.
        </p>
      )}
      {message === "error" && errorText && (
        <p className="rounded-lg bg-red-500/20 p-3 text-sm text-red-600 dark:text-red-400">
          {errorText}
        </p>
      )}

      {email?.trim() ? (
        <LooplyPrimaryButton
          onClick={handleResend}
          disabled={loading}
        >
          {loading ? "Envoi en cours…" : "Renvoyer le lien d'activation"}
        </LooplyPrimaryButton>
      ) : (
        <LooplyPrimaryButton asChild>
          <Link href="/login">
            J'ai activé mon compte, me connecter
          </Link>
        </LooplyPrimaryButton>
      )}

      {email?.trim() && (
        <Link
          href="/login"
          className="block text-center text-sm text-muted-foreground underline hover:text-foreground"
        >
          J'ai activé mon compte, me connecter
        </Link>
      )}

      <p className="text-center text-xs text-muted-foreground">
        Vous n'avez pas reçu l'email ? Vérifiez vos spams ou cliquez sur
        « Renvoyer le lien » ci-dessus.
      </p>
    </>
  );
}
