import { createClient } from "@/lib/supabase/server";

export async function getAppointments(orgId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("organization_id", orgId)
    .order("scheduled_at", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getAppointment(orgId: string, appointmentId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("organization_id", orgId)
    .eq("id", appointmentId)
    .single();

  if (error) throw error;
  return data;
}
