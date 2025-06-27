import { UserRole } from './roles';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  // Add other user properties as needed
  created_at?: string;
  updated_at?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
