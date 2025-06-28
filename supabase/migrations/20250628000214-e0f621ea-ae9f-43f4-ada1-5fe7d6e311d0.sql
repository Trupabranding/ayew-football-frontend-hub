
-- Create players table
CREATE TABLE public.players (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT,
  nationality TEXT,
  date_of_birth DATE,
  height_cm INTEGER,
  weight_kg INTEGER,
  photo_url TEXT,
  cv_url TEXT,
  highlight_video_url TEXT,
  bio TEXT,
  goals INTEGER DEFAULT 0,
  assists INTEGER DEFAULT 0,
  appearances INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_visible_homepage BOOLEAN DEFAULT true,
  season TEXT,
  squad TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create partners table
CREATE TABLE public.partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  partner_type TEXT NOT NULL, -- 'investor', 'sponsor', 'partner'
  tier TEXT, -- 'bronze', 'silver', 'gold', 'platinum'
  logo_url TEXT,
  description TEXT,
  investment_amount DECIMAL(10,2),
  contact_person TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create media library table
CREATE TABLE public.media_library (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'image', 'video', 'document'
  mime_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  tags TEXT[],
  folder TEXT DEFAULT 'general',
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create messages/chat table
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  sender_phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'general', -- 'general', 'player_inquiry', 'partner_interest'
  status TEXT DEFAULT 'unread', -- 'unread', 'read', 'replied'
  admin_reply TEXT,
  replied_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create multilingual content table
CREATE TABLE public.multilingual_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type TEXT NOT NULL, -- 'section', 'page', 'player', 'blog'
  content_id UUID NOT NULL,
  language_code TEXT NOT NULL, -- 'en', 'es', 'fr', 'de'
  field_name TEXT NOT NULL, -- 'title', 'content', 'bio', etc
  translated_value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(content_type, content_id, language_code, field_name)
);

-- Add RLS policies for players
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Players are viewable by everyone" ON public.players
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can insert players" ON public.players
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update players" ON public.players
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can delete players" ON public.players
  FOR DELETE USING (auth.role() = 'authenticated');

-- Add RLS policies for partners
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Partners are viewable by everyone" ON public.partners
  FOR SELECT USING (is_active = true);

CREATE POLICY "Only authenticated users can manage partners" ON public.partners
  FOR ALL USING (auth.role() = 'authenticated');

-- Add RLS policies for media library
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Media is viewable by everyone" ON public.media_library
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can manage media" ON public.media_library
  FOR ALL USING (auth.role() = 'authenticated');

-- Add RLS policies for messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only authenticated users can view messages" ON public.messages
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can insert messages" ON public.messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Only authenticated users can update messages" ON public.messages
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Add RLS policies for multilingual content
ALTER TABLE public.multilingual_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Multilingual content is viewable by everyone" ON public.multilingual_content
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can manage multilingual content" ON public.multilingual_content
  FOR ALL USING (auth.role() = 'authenticated');
