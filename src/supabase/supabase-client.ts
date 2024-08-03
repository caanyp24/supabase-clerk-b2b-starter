'use client';

import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

let supabase: ReturnType<typeof createClient> | null = null;

export function useSupabase() {
  const { getToken } = useAuth();
  const [supabaseClient, setSupabaseClient] = useState<ReturnType<
    typeof createClient
  > | null>(null);

  useEffect(() => {
    if (!supabase) {
      supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!,
        {
          global: {
            fetch: async (url, options = {}) => {
              const token = await getToken({ template: 'supabase' });
              const headers = new Headers(options?.headers);
              headers.set('Authorization', `Bearer ${token}`);
              return fetch(url, {
                ...options,
                headers,
              });
            },
          },
        }
      );
    }
    setSupabaseClient(supabase);
  }, [getToken]);

  return supabaseClient;
}
