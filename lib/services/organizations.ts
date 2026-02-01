import { createClient } from "@/lib/supabase/server";

// TODO: typer avec les types générés Supabase quand la DB est prête
export async function getOrganization(orgId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("organizations")
    .select("*")
    .eq("id", orgId)
    .single();

  if (error) throw error;
  return data;
}

export async function getOrganizationsForUser(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("organizations")
    .select("*")
    .eq("owner_id", userId);

  if (error) throw error;
  return data ?? [];
}

export type CreateOrganizationParams = {
  name: string;
  timezone?: string;
  defaultChannel?: "email" | "sms" | "whatsapp";
};

export async function createOrganization(
  userId: string,
  params: CreateOrganizationParams
) {
  const supabase = await createClient();

  // Validation basique
  if (!params.name || !params.name.trim()) {
    throw new Error("Le nom de l'activité est requis.");
  }

  // Détection auto du timezone si non fourni
  const timezone = params.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const defaultChannel = params.defaultChannel || "email";

  const { data, error } = await supabase
    .from("organizations")
    .insert({
      name: params.name.trim(),
      owner_id: userId,
      timezone,
      default_channel: defaultChannel,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Erreur lors de la création de l'organisation : ${error.message}`);
  }

  return data;
}
