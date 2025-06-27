
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RichTextEditor } from './RichTextEditor';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Eye, Trash2, Globe, FileText } from 'lucide-react';

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  meta_title: string | null;
  meta_description: string | null;
  is_published: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export const PagesManager = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching pages:', error);
        toast({
          title: "Error",
          description: "Failed to load pages",
          variant: "destructive"
        });
      } else {
        setPages(data || []);
      }
    } catch (error) {
      console.error('Pages fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePage = () => {
    const newPage: Page = {
      id: '',
      title: '',
      slug: '',
      content: '',
      meta_title: '',
      meta_description: '',
      is_published: false,
      created_at: null,
      updated_at: null
    };
    setEditingPage(newPage);
    setIsDialogOpen(true);
  };

  const handleEditPage = (page: Page) => {
    setEditingPage({ ...page });
    setIsDialogOpen(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSavePage = async () => {
    if (!editingPage) return;

    setSaving(true);
    try {
      const slug = editingPage.slug || generateSlug(editingPage.title);
      
      if (editingPage.id) {
        // Update existing page
        const { error } = await supabase
          .from('pages')
          .update({
            title: editingPage.title,
            slug: slug,
            content: editingPage.content,
            meta_title: editingPage.meta_title,
            meta_description: editingPage.meta_description,
            is_published: editingPage.is_published,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingPage.id);

        if (error) throw error;
      } else {
        // Create new page
        const { error } = await supabase
          .from('pages')
          .insert({
            title: editingPage.title,
            slug: slug,
            content: editingPage.content,
            meta_title: editingPage.meta_title,
            meta_description: editingPage.meta_description,
            is_published: editingPage.is_published
          });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Page ${editingPage.id ? 'updated' : 'created'} successfully`
      });

      setIsDialogOpen(false);
      setEditingPage(null);
      fetchPages();
    } catch (error) {
      console.error('Error saving page:', error);
      toast({
        title: "Error",
        description: "Failed to save page",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const togglePublishStatus = async (page: Page) => {
    try {
      const { error } = await supabase
        .from('pages')
        .update({ is_published: !page.is_published })
        .eq('id', page.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Page ${!page.is_published ? 'published' : 'unpublished'}`
      });

      fetchPages();
    } catch (error) {
      console.error('Error toggling publish status:', error);
      toast({
        title: "Error",
        description: "Failed to update page status",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="animate-pulse space-y-4">Loading pages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Pages Management</h3>
          <p className="text-sm text-muted-foreground">
            Create and manage website pages
          </p>
        </div>
        <Button onClick={handleCreatePage}>
          <Plus className="h-4 w-4 mr-2" />
          New Page
        </Button>
      </div>

      <div className="grid gap-4">
        {pages.map((page) => (
          <Card key={page.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg">{page.title}</CardTitle>
                <p className="text-sm text-muted-foreground">/{page.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={page.is_published ? "default" : "secondary"}>
                  {page.is_published ? "Published" : "Draft"}
                </Badge>
                <Switch
                  checked={page.is_published || false}
                  onCheckedChange={() => togglePublishStatus(page)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    {page.content?.length || 0} characters
                  </span>
                  <span>Updated {new Date(page.updated_at || '').toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditPage(page)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPage?.id ? 'Edit Page' : 'Create New Page'}
            </DialogTitle>
          </DialogHeader>
          
          {editingPage && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Page Title</label>
                  <Input
                    value={editingPage.title}
                    onChange={(e) => setEditingPage({
                      ...editingPage,
                      title: e.target.value,
                      slug: generateSlug(e.target.value)
                    })}
                    placeholder="Enter page title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">URL Slug</label>
                  <Input
                    value={editingPage.slug}
                    onChange={(e) => setEditingPage({
                      ...editingPage,
                      slug: e.target.value
                    })}
                    placeholder="page-url-slug"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Content</label>
                <RichTextEditor
                  value={editingPage.content || ''}
                  onChange={(content) => setEditingPage({
                    ...editingPage,
                    content
                  })}
                  placeholder="Write your page content here..."
                  minHeight={300}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Meta Title</label>
                  <Input
                    value={editingPage.meta_title || ''}
                    onChange={(e) => setEditingPage({
                      ...editingPage,
                      meta_title: e.target.value
                    })}
                    placeholder="SEO meta title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Meta Description</label>
                  <Input
                    value={editingPage.meta_description || ''}
                    onChange={(e) => setEditingPage({
                      ...editingPage,
                      meta_description: e.target.value
                    })}
                    placeholder="SEO meta description"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={editingPage.is_published || false}
                    onCheckedChange={(checked) => setEditingPage({
                      ...editingPage,
                      is_published: checked
                    })}
                  />
                  <label className="text-sm font-medium">Publish immediately</label>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSavePage}
                    disabled={saving || !editingPage.title}
                  >
                    {saving ? 'Saving...' : (editingPage.id ? 'Update' : 'Create')} Page
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
