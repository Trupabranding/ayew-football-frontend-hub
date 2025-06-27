
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';

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

interface SectionEditorProps {
  section: Section;
  onSave: (section: Section) => void;
  onCancel: () => void;
  onUpdate: (field: keyof Section, value: any) => void;
  saving: boolean;
}

export const SectionEditor = ({ 
  section, 
  onSave, 
  onCancel, 
  onUpdate, 
  saving 
}: SectionEditorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Active</span>
          <Switch
            checked={section.is_active}
            onCheckedChange={(checked) => onUpdate('is_active', checked)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => onSave(section)}
            disabled={saving}
          >
            <Save className="h-4 w-4 mr-1" />
            {saving ? 'Saving...' : 'Save'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium">Title</label>
        <Input
          value={section.title}
          onChange={(e) => onUpdate('title', e.target.value)}
          placeholder="Section title"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Content</label>
        <RichTextEditor
          value={section.content}
          onChange={(content) => onUpdate('content', content)}
          placeholder="Section content"
          minHeight={200}
        />
      </div>
    </div>
  );
};
