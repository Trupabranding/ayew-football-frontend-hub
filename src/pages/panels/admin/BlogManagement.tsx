
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Save, 
  Edit, 
  Plus, 
  Trash2, 
  Eye, 
  Calendar,
  FileText,
  Globe
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export default function BlogManagement() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        toast({
          title: "Error",
          description: "Failed to load blog posts",
          variant: "destructive"
        });
      } else {
        setBlogPosts(data || []);
      }
    } catch (error) {
      console.error('Blog posts fetch error:', error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleCreatePost = () => {
    const newPost: BlogPost = {
      id: '',
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featured_image: null,
      meta_title: null,
      meta_description: null,
      meta_keywords: null,
      is_published: false,
      published_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setEditingPost(newPost);
    setIsCreating(true);
  };

  const handleSavePost = async (post: BlogPost) => {
    setSaving(true);
    try {
      const postData = {
        title: post.title,
        slug: post.slug || generateSlug(post.title),
        excerpt: post.excerpt,
        content: post.content,
        featured_image: post.featured_image,
        meta_title: post.meta_title,
        meta_description: post.meta_description,
        meta_keywords: post.meta_keywords,
        is_published: post.is_published,
        published_at: post.is_published ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      };

      let error;
      if (isCreating) {
        const { error: createError } = await supabase
          .from('blog_posts')
          .insert([postData]);
        error = createError;
      } else {
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', post.id);
        error = updateError;
      }

      if (error) {
        console.error('Error saving blog post:', error);
        toast({
          title: "Error",
          description: "Failed to save blog post",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: `Blog post ${isCreating ? 'created' : 'updated'} successfully`
        });
        setEditingPost(null);
        setIsCreating(false);
        fetchBlogPosts();
      }
    } catch (error) {
      console.error('Blog post save error:', error);
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) {
        console.error('Error deleting blog post:', error);
        toast({
          title: "Error",
          description: "Failed to delete blog post",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Blog post deleted successfully"
        });
        fetchBlogPosts();
      }
    } catch (error) {
      console.error('Blog post delete error:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive"
      });
    }
  };

  const updateEditingPost = (field: keyof BlogPost, value: any) => {
    if (editingPost) {
      setEditingPost({
        ...editingPost,
        [field]: value
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blog Management</h2>
          <p className="text-muted-foreground">
            Create and manage blog posts
          </p>
        </div>
        <Button onClick={handleCreatePost} className="gap-2">
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      {editingPost && (
        <Card>
          <CardHeader>
            <CardTitle>
              {isCreating ? 'Create New Post' : 'Edit Post'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={editingPost.title}
                  onChange={(e) => updateEditingPost('title', e.target.value)}
                  placeholder="Post title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Slug</label>
                <Input
                  value={editingPost.slug}
                  onChange={(e) => updateEditingPost('slug', e.target.value)}
                  placeholder="URL slug (auto-generated if empty)"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Excerpt</label>
              <Textarea
                value={editingPost.excerpt}
                onChange={(e) => updateEditingPost('excerpt', e.target.value)}
                placeholder="Brief description of the post"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={editingPost.content}
                onChange={(e) => updateEditingPost('content', e.target.value)}
                placeholder="Full post content"
                rows={8}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Meta Title</label>
                <Input
                  value={editingPost.meta_title || ''}
                  onChange={(e) => updateEditingPost('meta_title', e.target.value)}
                  placeholder="SEO title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Meta Keywords</label>
                <Input
                  value={editingPost.meta_keywords || ''}
                  onChange={(e) => updateEditingPost('meta_keywords', e.target.value)}
                  placeholder="Comma-separated keywords"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Meta Description</label>
              <Textarea
                value={editingPost.meta_description || ''}
                onChange={(e) => updateEditingPost('meta_description', e.target.value)}
                placeholder="SEO description"
                rows={2}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={editingPost.is_published}
                  onCheckedChange={(checked) => updateEditingPost('is_published', checked)}
                />
                <span className="text-sm">Published</span>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleSavePost(editingPost)}
                  disabled={saving}
                >
                  <Save className="h-4 w-4 mr-1" />
                  {saving ? 'Saving...' : 'Save'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingPost(null);
                    setIsCreating(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {blogPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  {post.is_published ? (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      <Globe className="h-3 w-3 mr-1" />
                      Published
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <FileText className="h-3 w-3 mr-1" />
                      Draft
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.published_at 
                      ? new Date(post.published_at).toLocaleDateString()
                      : new Date(post.created_at).toLocaleDateString()
                    }
                  </span>
                  <span>Slug: /{post.slug}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditingPost(post)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeletePost(post.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
        
        {blogPosts.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No blog posts yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first blog post to start sharing news and updates.
              </p>
              <Button onClick={handleCreatePost} className="gap-2">
                <Plus className="h-4 w-4" />
                Create First Post
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
