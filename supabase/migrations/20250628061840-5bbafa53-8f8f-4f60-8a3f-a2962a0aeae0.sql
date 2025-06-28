
-- First, let's add the missing columns to the existing faqs table
ALTER TABLE public.faqs 
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id);

-- Create the app_role enum if it doesn't exist
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('admin', 'investor', 'player', 'partner');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- Create RLS policies for user_roles
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles" 
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
CREATE POLICY "Admins can manage all roles" 
ON public.user_roles
USING (has_role(auth.uid(), 'admin'::app_role));

-- Enable RLS on faqs (in case it wasn't enabled before)
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view active FAQs" ON public.faqs;
DROP POLICY IF EXISTS "Authenticated users can create FAQs" ON public.faqs;
DROP POLICY IF EXISTS "Users can update their own FAQs" ON public.faqs;
DROP POLICY IF EXISTS "Admins can manage all FAQs" ON public.faqs;

-- Create RLS policies for faqs
-- Public can read active FAQs
CREATE POLICY "Public can view active FAQs"
ON public.faqs
FOR SELECT
USING (is_active = true);

-- Authenticated users can create FAQs
CREATE POLICY "Authenticated users can create FAQs"
ON public.faqs
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Users can update their own FAQs (only if they have created_by set)
CREATE POLICY "Users can update their own FAQs"
ON public.faqs
FOR UPDATE
USING (auth.uid() = created_by)
WITH CHECK (auth.uid() = created_by);

-- Admins can do anything with FAQs
CREATE POLICY "Admins can manage all FAQs"
ON public.faqs
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Function to assign admin role to first user
CREATE OR REPLACE FUNCTION public.assign_admin_role_to_first_user(user_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if any admin exists
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin'::app_role) THEN
    -- Insert admin role for the first user
    INSERT INTO public.user_roles (user_id, role)
    VALUES (user_id, 'admin'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END;
$$;

-- Trigger function to automatically assign admin to first user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Assign admin if no admins exist
  PERFORM public.assign_admin_role_to_first_user(NEW.id);
  RETURN NEW;
END;
$$;

-- Create trigger to run on new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create user tracking trigger for FAQs
CREATE OR REPLACE FUNCTION public.handle_faq_user_tracking()
RETURNS TRIGGER AS $$
BEGIN
  -- Set created_by on INSERT
  IF TG_OP = 'INSERT' THEN
    NEW.created_by = auth.uid();
    NEW.updated_by = auth.uid();
    RETURN NEW;
  END IF;
  
  -- Set updated_by on UPDATE
  IF TG_OP = 'UPDATE' THEN
    NEW.updated_by = auth.uid();
    RETURN NEW;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add trigger to FAQs table
DROP TRIGGER IF EXISTS faqs_user_tracking_trigger ON public.faqs;
CREATE TRIGGER faqs_user_tracking_trigger
  BEFORE INSERT OR UPDATE ON public.faqs
  FOR EACH ROW EXECUTE FUNCTION public.handle_faq_user_tracking();

-- Indexes for user_roles
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);

-- Indexes for faqs
CREATE INDEX IF NOT EXISTS idx_faqs_category ON public.faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_is_active ON public.faqs(is_active);
CREATE INDEX IF NOT EXISTS idx_faqs_sort_order ON public.faqs(sort_order);
CREATE INDEX IF NOT EXISTS idx_faqs_created_by ON public.faqs(created_by);
CREATE INDEX IF NOT EXISTS idx_faqs_updated_by ON public.faqs(updated_by);
