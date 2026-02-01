"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { createClient } from "@/lib/supabase/client";
import type { Organization } from "@/types";

export function useOrganization() {
  const { user } = useAuth();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setOrganization(null);
      setLoading(false);
      return;
    }

    const supabase = createClient();

    supabase
      .from("organizations")
      .select("*")
      .eq("owner_id", user.id)
      .limit(1)
      .single()
      .then(({ data, error }) => {
        if (!error) setOrganization(data as Organization);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.id]);

  return { organization, loading };
}
