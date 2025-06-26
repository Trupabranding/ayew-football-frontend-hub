
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session, AuthError } from '@supabase/supabase-js';

interface AuthErrorResponse {
  error: AuthError | Error | null;
  message?: string;
}

interface AuthContextType {
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkSupabaseConnection = async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('*').limit(1);
      if (error) throw error;
      return { connected: true, error: null };
    } catch (error) {
      console.error('Supabase connection error:', error);
      return { 
        connected: false, 
        error: error instanceof Error ? error : new Error('Failed to connect to Supabase') 
      };
    }
  };

  // Test the connection when the context is initialized
  useEffect(() => {
    const testConnection = async () => {
      const { connected, error } = await checkSupabaseConnection();
      if (connected) {
        console.log('✅ Successfully connected to Supabase');
      } else {
        console.error('❌ Failed to connect to Supabase:', error?.message);
      }
    };
    testConnection();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        
        // Handle specific error cases
        if (error.message.includes('Invalid login credentials')) {
          return { 
            error: { 
              ...error, 
              message: 'Invalid email or password. Please try again.' 
            } 
          };
        }
        
        if (error.message.includes('Email not confirmed')) {
          return { 
            error: { 
              ...error, 
              message: 'Please confirm your email before logging in.' 
            } 
          };
        }
        
        return { error };
      }

      // Successfully logged in
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
      // Type assertion to ensure TypeScript knows about the email property
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
