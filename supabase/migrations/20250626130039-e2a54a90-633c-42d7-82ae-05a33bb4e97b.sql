
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('admin', 'investor', 'partner', 'player');

-- Create user roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(check_user_id UUID, check_role user_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = check_user_id
      AND role = check_role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some dummy accounts for testing
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data, aud, role)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'admin@mafarah.com', crypt('admin123', gen_salt('bf')), NOW(), NOW(), NOW(), '{"first_name": "Admin", "last_name": "User"}', 'authenticated', 'authenticated'),
  ('550e8400-e29b-41d4-a716-446655440001', 'investor@mafarah.com', crypt('investor123', gen_salt('bf')), NOW(), NOW(), NOW(), '{"first_name": "John", "last_name": "Investor"}', 'authenticated', 'authenticated'),
  ('550e8400-e29b-41d4-a716-446655440002', 'player@mafarah.com', crypt('player123', gen_salt('bf')), NOW(), NOW(), NOW(), '{"first_name": "Alex", "last_name": "Player"}', 'authenticated', 'authenticated');

-- Assign roles to dummy accounts
INSERT INTO public.user_roles (user_id, role)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'admin'),
  ('550e8400-e29b-41d4-a716-446655440001', 'investor'),
  ('550e8400-e29b-41d4-a716-446655440002', 'player');
