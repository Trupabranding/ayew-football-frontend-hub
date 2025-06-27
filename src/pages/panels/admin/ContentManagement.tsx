import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Save, Edit, Plus, Trash2, Eye } from 'lucide-react';

interface Section {
  id: string;
  name: string;
  title: string;
  content: string;
  section_type: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export default function ContentManagement() {
  const [sections, setSections] = useState<Section[]>([]);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching sections:', error);
        toast({
          title: "Error",
          description: "Failed to load sections",
          variant: "destructive"
        });
      } else {
        setSections(data || []);
      }
    } catch (error) {
      console.error('Sections fetch error:', error);
      toast({
        title: "Error",
        description: "Failed to load sections",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSection = async (section: Section) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('sections')
        .update({
          title: section.title,
          content: section.content,
          is_active: section.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', section.id);

      if (error) {
        console.error('Error updating section:', error);
        toast({
          title: "Error",
          description: "Failed to update section",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Section updated successfully"
        });
        setEditingSection(null);
        fetchSections();
      }
    } catch (error) {
      console.error('Section update error:', error);
      toast({
        title: "Error",
        description: "Failed to update section",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEditSection = (section: Section) => {
    setEditingSection({ ...section });
  };

  const handleCancelEdit = () => {
    setEditingSection(null);
  };

  const updateEditingSection = (field: keyof Section, value: any) => {
    if (editingSection) {
      setEditingSection({
        ...editingSection,
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
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Content Management System (CMS)</h2>
        <p className="text-muted-foreground">
          Manage website pages and sections content
        </p>
      </div>

      <div className="grid gap-6">
        {sections.map((section) => (
          <Card key={section.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="capitalize">{section.name} Section</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Type: {section.section_type} • Order: {section.sort_order}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Active</span>
                  <Switch
                    checked={section.is_active}
                    onCheckedChange={(checked) => {
                      if (editingSection?.id === section.id) {
                        updateEditingSection('is_active', checked);
                      } else {
                        // Quick toggle without editing
                        supabase
                          .from('sections')
                          .update({ is_active: checked })
                          .eq('id', section.id)
                          .then(() => fetchSections());
                      }
                    }}
                  />
                </div>
                {editingSection?.id === section.id ? (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSaveSection(editingSection)}
                      disabled={saving}
                    >
                      <Save className="h-4 w-4 mr-1" />
                      {saving ? 'Saving...' : 'Save'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditSection(section)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {editingSection?.id === section.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={editingSection.title}
                      onChange={(e) => updateEditingSection('title', e.target.value)}
                      placeholder="Section title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Content</label>
                    <Textarea
                      value={editingSection.content}
                      onChange={(e) => updateEditingSection('content', e.target.value)}
                      placeholder="Section content"
                      rows={6}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{section.title}</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {section.content}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Last updated: {new Date(section.updated_at).toLocaleDateString()}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
