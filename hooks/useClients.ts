"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Client } from "@/types";

export function useClients(orgId: string | undefined) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orgId) {
      setClients([]);
      setLoading(false);
      return;
    }

    const supabase = createClient();

    supabase
      .from("clients")
      .select("*")
      .eq("organization_id", orgId)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error) setClients((data as Client[]) ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [orgId]);

  return { clients, loading };
}
