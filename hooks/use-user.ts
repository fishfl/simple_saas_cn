"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Get user on mount
    getUser();

    // Listen for changes on auth state (login, sign out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function getUser() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error("Error getting user:", error);
    } finally {
      setLoading(false);
    }
  }

  return { user, loading };
}
