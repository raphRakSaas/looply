import { createClient } from "@/lib/supabase/server";

export async function getClients(orgId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("organization_id", orgId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getClient(orgId: string, clientId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("organization_id", orgId)
    .eq("id", clientId)
    .single();

  if (error) throw error;
  return data;
}
