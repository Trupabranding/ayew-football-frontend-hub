
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { UserRole } from '@/types/roles';

interface AuthUser extends User {
  role?: UserRole;
}

interface AuthErrorResponse {
  error: AuthError | Error | null;
  message?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthErrorResponse>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<AuthErrorResponse>;
  signOut: () => Promise<void>;
  checkUserExists: (email: string) => Promise<boolean>;
  resendConfirmationEmail: (email: string) => Promise<{ error: AuthError | Error | null; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async (userId: string): Promise<UserRole | null> => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }

      return data?.role as UserRole || null;
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  };

  const updateUserWithRole = async (authUser: User | null) => {
    if (!authUser) {
      setUser(null);
      return;
    }

    const role = await fetchUserRole(authUser.id);
    setUser({
      ...authUser,
      role: role || undefined,
    });
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          await updateUserWithRole(session.user);
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      
      if (session?.user) {
        await updateUserWithRole(session.user);
      } else {
        setUser(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        
        if (error.message.includes('Invalid login credentials')) {
          return { 
            error: { 
              ...error, 
              message: 'Invalid email or password. Please try again.' 
            } 
          };
        }
        
        return { error };
      }

      console.log('Login successful:', data);
      return { error: null };
      
    } catch (error) {
      console.error('Unexpected error during login:', error);
      return { 
        error: error instanceof Error 
          ? error 
          : new Error('An unexpected error occurred during login') 
      };
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });

      if (error) {
        console.error('Signup error:', error.message);
        
        if (error.message.includes('already registered')) {
          return { 
            error,
            message: 'This email is already registered. Please sign in instead.'
          };
        }
        
        return { 
          error,
          message: 'Failed to create account. Please try again.'
        };
      }

      console.log('Signup successful:', data);
      return { 
        error: null,
        message: 'Account created successfully! Please check your email to confirm your account.'
      };
      
    } catch (error) {
      console.error('Unexpected error during signup:', error);
      return { 
        error: error instanceof Error ? error : new Error('An unexpected error occurred'),
        message: 'An unexpected error occurred during signup.'
      };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const checkUserExists = async (email: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.admin.listUsers();
      if (error) throw error;
      return data.users.some((user: { email?: string }) => user.email === email);
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false;
    }
  };

  const resendConfirmationEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });

      if (error) throw error;

      return {
        error: null,
        message: 'Confirmation email resent. Please check your inbox.'
      };
    } catch (error) {
      console.error('Error resending confirmation email:', error);
      return {
        error: error instanceof Error ? error : new Error('Failed to resend confirmation email'),
        message: 'Failed to resend confirmation email. Please try again.'
      };
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    checkUserExists,
    resendConfirmationEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
