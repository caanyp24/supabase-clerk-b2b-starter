'use server';

import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

export async function createSupabaseClient() {
  const { getToken } = auth();

  return createClient(
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
