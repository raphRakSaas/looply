import { createClient } from "@/lib/supabase/server";

export async function getAutomatisations(orgId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("automatisation_rules")
    .select("*")
    .eq("organization_id", orgId);

  if (error) throw error;
  return data ?? [];
}
