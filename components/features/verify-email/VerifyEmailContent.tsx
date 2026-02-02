"use client";

import { useState } from "react";
import Link from "next/link";
import { resendConfirmationEmail } from "@/lib/auth/actions";
import { LooplyPrimaryButton } from "@/components/ui/LooplyPrimaryButton";

const buttonClass =
  "block w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:pointer-events-none";

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
      <p className="text-sm text-zinc-300">
        Consultez votre boîte de réception (et vos spams) puis cliquez sur le
        lien d’activation pour activer votre compte.
      </p>

      {message === "success" && (
        <p className="rounded-lg bg-emerald-500/20 p-3 text-sm text-emerald-400">
          Un nouvel email vous a été envoyé. Vérifiez votre boîte de réception.
        </p>
      )}
      {message === "error" && errorText && (
        <p className="rounded-lg bg-red-500/20 p-3 text-sm text-red-400">
          {errorText}
        </p>
      )}

      {email?.trim() ? (
        <LooplyPrimaryButton
          onClick={handleResend}
          disabled={loading}
        >
          {loading ? "Envoi en cours…" : "Renvoyer le lien d’activation"}
        </LooplyPrimaryButton>
      ) : (
        <Link href="/login" className={buttonClass}>
          J’ai activé mon compte, me connecter
        </Link>
      )}

      {email?.trim() && (
        <Link
          href="/login"
          className="block text-center text-sm text-zinc-400 underline hover:text-zinc-300"
        >
          J’ai activé mon compte, me connecter
        </Link>
      )}

      <p className="text-center text-xs text-zinc-500">
        Vous n’avez pas reçu l’email ? Vérifiez vos spams ou cliquez sur
        « Renvoyer le lien » ci-dessus.
      </p>
    </>
  );
}
