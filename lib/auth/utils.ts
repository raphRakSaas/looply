import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getSession() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Redirige vers /login si l'utilisateur n'est pas connecté.
 * À utiliser dans les layouts ou pages protégées.
 */
export async function requireAuth() {
  try {
    const user = await getUser();
    if (!user) {
      redirect("/login");
    }
    return user;
  } catch {
    redirect("/login");
  }
}
