
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// NOTE: These environment variables need to be set in .env.local
// NEXT_PUBLIC_SUPABASE_URL
// NEXT_PUBLIC_SUPABASE_ANON_KEY

export const createClient = () => createClientComponentClient();
