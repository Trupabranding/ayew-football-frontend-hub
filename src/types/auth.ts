
import { UserRole } from './roles';
import { User as SupabaseUser } from '@supabase/supabase-js';

export interface User extends SupabaseUser {
  role?: UserRole;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
