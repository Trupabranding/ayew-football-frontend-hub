
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { SectionCard } from './SectionCard';

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

interface SectionsManagerProps {
  onStatsUpdate: () => void;
}

export const SectionsManager = ({ onStatsUpdate }: SectionsManagerProps) => {
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
        onStatsUpdate();
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

  const toggleSectionStatus = async (section: Section) => {
    try {
      const { error } = await supabase
        .from('sections')
        .update({ is_active: !section.is_active })
        .eq('id', section.id);

      if (error) throw error;

      fetchSections();
      onStatsUpdate();
    } catch (error) {
      console.error('Error toggling section status:', error);
      toast({
        title: "Error",
        description: "Failed to update section status",
        variant: "destructive"
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
    <div className="grid gap-6">
      {sections.map((section) => (
        <SectionCard
          key={section.id}
          section={section}
          isEditing={editingSection?.id === section.id}
          editingSection={editingSection}
          onEdit={handleEditSection}
          onSave={handleSaveSection}
          onCancel={handleCancelEdit}
          onUpdate={updateEditingSection}
          onToggleStatus={toggleSectionStatus}
          saving={saving}
        />
      ))}
    </div>
  );
};
