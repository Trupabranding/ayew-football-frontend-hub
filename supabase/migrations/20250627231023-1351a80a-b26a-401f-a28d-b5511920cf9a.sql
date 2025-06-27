
-- Clean up any existing dummy/test users and start fresh
-- Remove any test users that might have been created during development
DELETE FROM public.user_roles WHERE user_id IN (
  SELECT id FROM auth.users WHERE email LIKE '%@mafasc.org'
);

-- The handle_new_user function already ensures the first user gets admin role
-- Let's also add some sample FAQs data to prepare for the FAQ section
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS for FAQs
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Anyone can view active FAQs
CREATE POLICY "Anyone can view active FAQs" ON public.faqs
  FOR SELECT USING (is_active = true);

-- Admins can manage all FAQs
CREATE POLICY "Admins can manage all FAQs" ON public.faqs
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Insert some sample FAQs
INSERT INTO public.faqs (question, answer, category, sort_order) VALUES
('What is Mafarah Ayew Football Academy?', 'Mafarah Ayew Football Academy is a premier football training institution in Ghana focused on developing young talent through professional coaching and academic excellence.', 'general', 1),
('How can I join the academy?', 'You can apply to join our academy by contacting us through our website or visiting our facilities. We conduct regular trials and assessments for new players.', 'enrollment', 2),
('What age groups do you accept?', 'We accept players from ages 8 to 18, with different programs tailored for various age groups and skill levels.', 'enrollment', 3),
('Do you provide accommodation?', 'Yes, we offer residential facilities for players who come from outside the local area, ensuring they have a safe and supportive environment.', 'facilities', 4),
('What are the investment opportunities?', 'We offer various investment packages that allow supporters to contribute to player development, facility improvements, and academy operations while potentially earning returns.', 'investment', 5);
