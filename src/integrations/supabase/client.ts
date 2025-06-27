
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://intoowqkpggebtyqtggi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludG9vd3FrcGdnZWJ0eXF0Z2dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNjYwNTIsImV4cCI6MjA2NjY0MjA1Mn0.qCbhLsAmxnc38Xf9okI4xbrQN2ptTOj86jq6fxW4H0Y";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
