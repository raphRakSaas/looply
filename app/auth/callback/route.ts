import { createClient } from "@/lib/supabase/server";
import { getOrganizationsForUser } from "@/lib/services/organizations";
import { NextResponse } from "next/server";

/**
 * Route callback OAuth (Google, etc.)
 * Supabase va rediriger ici après l'authentification Google
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("[OAuth Callback] Erreur:", error);
      // Rediriger vers login avec un message d'erreur
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent("Erreur de connexion. Réessayez.")}`, requestUrl.origin)
      );
    }

    // Vérifier si l'utilisateur a déjà une organisation
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const organizations = await getOrganizationsForUser(user.id);
        
        // Si l'utilisateur n'a pas d'organisation, rediriger vers l'onboarding
        if (!organizations || organizations.length === 0) {
          return NextResponse.redirect(new URL("/onboarding", requestUrl.origin));
        }
      }
    } catch (err) {
      console.error("[OAuth Callback] Erreur lors de la vérification de l'organisation:", err);
      // Continuer vers dashboard en cas d'erreur
    }
  }

  // Redirection vers dashboard (ou next si spécifié)
  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
