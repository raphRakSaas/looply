import { createClient } from "@/lib/supabase/server";

export async function getMessages(orgId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("organization_id", orgId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}
