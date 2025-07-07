
-- Create storage bucket for academy images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'academy-images',
  'academy-images',
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Create storage policies for academy images
CREATE POLICY "Academy images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'academy-images');

CREATE POLICY "Authenticated users can upload academy images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'academy-images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update academy images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'academy-images' AND auth.role() = 'authenticated')
WITH CHECK (bucket_id = 'academy-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete academy images"
ON storage.objects FOR DELETE
USING (bucket_id = 'academy-images' AND auth.role() = 'authenticated');
