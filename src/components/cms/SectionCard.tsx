
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Edit } from 'lucide-react';
import { SectionEditor } from './SectionEditor';

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

interface SectionCardProps {
  section: Section;
  isEditing: boolean;
  editingSection: Section | null;
  onEdit: (section: Section) => void;
  onSave: (section: Section) => void;
  onCancel: () => void;
  onUpdate: (field: keyof Section, value: any) => void;
  onToggleStatus: (section: Section) => void;
  saving: boolean;
}

export const SectionCard = ({
  section,
  isEditing,
  editingSection,
  onEdit,
  onSave,
  onCancel,
  onUpdate,
  onToggleStatus,
  saving
}: SectionCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="capitalize">{section.name} Section</CardTitle>
          <p className="text-sm text-muted-foreground">
            Type: {section.section_type} • Order: {section.sort_order}
          </p>
        </div>
        {!isEditing && (
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Active</span>
              <Switch
                checked={section.is_active}
                onCheckedChange={() => onToggleStatus(section)}
              />
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(section)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isEditing && editingSection ? (
          <SectionEditor
            section={editingSection}
            onSave={onSave}
            onCancel={onCancel}
            onUpdate={onUpdate}
            saving={saving}
          />
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
  );
};
