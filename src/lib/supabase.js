import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Initialize as null if credentials are missing to prevent crash
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : { 
      from: () => ({ 
        select: () => ({ 
          order: () => Promise.resolve({ data: [], error: { message: 'Supabase not configured' } }) 
        }),
        insert: (data) => Promise.resolve({ data, error: { message: 'Supabase not configured' } }),
        delete: () => ({
          eq: () => Promise.resolve({ error: { message: 'Supabase not configured' } })
        })
      }),
      channel: () => ({
        on: () => ({
          subscribe: () => ({})
        })
      })
    };
