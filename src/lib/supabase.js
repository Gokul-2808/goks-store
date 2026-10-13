
import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from the root .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Validate credentials
if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    'Supabase credentials are missing. Please check your .env file.'
  );
}

// Create the Supabase client
export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);
