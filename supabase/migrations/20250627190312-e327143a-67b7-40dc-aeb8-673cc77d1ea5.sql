
-- Create pages table for website content management
CREATE TABLE public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create sections table for reusable content sections
CREATE TABLE public.sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  section_type TEXT NOT NULL, -- 'hero', 'about', 'players', etc.
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create analytics/statistics table for dashboard data
CREATE TABLE public.site_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT NOT NULL,
  metric_value INTEGER NOT NULL,
  metric_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_statistics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for pages
CREATE POLICY "Anyone can view published pages" ON public.pages
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage all pages" ON public.pages
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for sections
CREATE POLICY "Anyone can view active sections" ON public.sections
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage all sections" ON public.sections
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for blog posts
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage all blog posts" ON public.blog_posts
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for site statistics
CREATE POLICY "Admins can view all statistics" ON public.site_statistics
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all statistics" ON public.site_statistics
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Insert dummy data for sections based on current website content
INSERT INTO public.sections (name, title, content, section_type, sort_order) VALUES
('hero', 'Welcome to Mafarah Ayew Football Academy', 'Nurturing the next generation of football talent in Ghana. Our academy combines world-class training with academic excellence to develop well-rounded student-athletes.', 'hero', 1),
('about', 'About Our Academy', 'Founded with a vision to transform Ghanaian football, Mafarah Ayew Football Academy provides comprehensive training programs that focus on technical skills, tactical awareness, and character development. Our experienced coaches and modern facilities create the perfect environment for young athletes to thrive.', 'about', 2),
('players', 'Our Players', 'Meet our talented roster of young athletes who represent the future of football. Each player brings unique skills and dedication to our academy community.', 'players', 3),
('investment', 'Investment Opportunities', 'Join us in shaping the future of football. Our investment programs offer opportunities to support young talent while building sustainable returns through player development and academy growth.', 'investment', 4),
('donations', 'Support Our Mission', 'Your donations help us provide scholarships, equipment, and facilities to deserving young athletes. Every contribution makes a difference in a child''s journey to success.', 'donations', 5),
('matches', 'Upcoming Matches', 'Follow our teams as they compete in various leagues and tournaments. Our match schedule showcases the progress and achievements of our academy players.', 'matches', 6),
('news', 'Latest News', 'Stay updated with the latest news, achievements, and events from Mafarah Ayew Football Academy. From tournament victories to new partnerships, we share our journey with you.', 'news', 7),
('contact', 'Get In Touch', 'Connect with us to learn more about our programs, schedule a visit, or discuss partnership opportunities. We''re here to answer your questions and welcome new members to our academy family.', 'contact', 8);

-- Insert dummy statistics data
INSERT INTO public.site_statistics (metric_name, metric_value) VALUES
('total_users', 234),
('total_players', 89),
('total_matches', 45),
('total_investments', 12),
('monthly_visitors', 1250),
('blog_posts', 23),
('active_programs', 8),
('scholarship_recipients', 15);

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, is_published, published_at) VALUES
('Academy Wins Regional Championship', 'academy-wins-regional-championship', 'Our U-16 team secured victory in the regional championship, showcasing months of dedicated training and teamwork.', 'In a thrilling final match, our U-16 team demonstrated exceptional skill and determination to win the regional championship. This victory represents not just athletic achievement, but the culmination of months of dedicated training, strategic preparation, and unwavering team spirit.', true, NOW() - INTERVAL '2 days'),
('New Training Facilities Opened', 'new-training-facilities-opened', 'State-of-the-art training facilities are now open, featuring modern equipment and improved playing surfaces.', 'We are excited to announce the opening of our new state-of-the-art training facilities. These modern amenities will enhance our training programs and provide our players with world-class resources to develop their skills.', true, NOW() - INTERVAL '1 week'),
('Scholarship Program Launches', 'scholarship-program-launches', 'Our new scholarship program aims to support talented young players from underprivileged backgrounds.', 'Education and football excellence should be accessible to all talented individuals, regardless of their economic background. Our new scholarship program identifies and supports promising young athletes, providing them with the resources and opportunities they need to succeed both on and off the field.', true, NOW() - INTERVAL '2 weeks');
