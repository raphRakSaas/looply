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
