
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
}

export const FAQManager = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newFAQ, setNewFAQ] = useState({
    question: '',
    answer: '',
    category: 'general',
    sort_order: 0
  });
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast({
        title: 'Error',
        description: 'Failed to load FAQs',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'You must be logged in to create FAQs',
        variant: 'destructive'
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('faqs')
        .insert([newFAQ]);
      
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'FAQ created successfully'
      });
      
      setNewFAQ({ question: '', answer: '', category: 'general', sort_order: 0 });
      setShowNewForm(false);
      fetchFAQs();
    } catch (error) {
      console.error('Error creating FAQ:', error);
      toast({
        title: 'Error',
        description: 'Failed to create FAQ. Make sure you have the required permissions.',
        variant: 'destructive'
      });
    }
  };

  const handleUpdate = async (id: string, updates: Partial<FAQ>) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'You must be logged in to update FAQs',
        variant: 'destructive'
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('faqs')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'FAQ updated successfully'
      });
      
      setEditingId(null);
      fetchFAQs();
    } catch (error) {
      console.error('Error updating FAQ:', error);
      toast({
        title: 'Error',
        description: 'Failed to update FAQ. You can only edit FAQs you created, or you need admin permissions.',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'You must be logged in to delete FAQs',
        variant: 'destructive'
      });
      return;
    }

    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    
    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'FAQ deleted successfully'
      });
      
      fetchFAQs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete FAQ. You can only delete FAQs you created, or you need admin permissions.',
        variant: 'destructive'
      });
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    await handleUpdate(id, { is_active: isActive });
  };

  const canEditFAQ = (faq: FAQ) => {
    if (!user) return false;
    // User can edit if they created it, or if they're an admin (admin check handled by RLS)
    return faq.created_by === user.id || user.role === 'admin';
  };

  if (loading) {
    return <div className="text-center py-8">Loading FAQs...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">FAQ Management</h3>
          <p className="text-sm text-muted-foreground">
            Manage frequently asked questions for your website
          </p>
        </div>
        {user && (
          <Button
            onClick={() => setShowNewForm(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add FAQ
          </Button>
        )}
      </div>

      {!user && (
        <div className="text-center py-8 text-muted-foreground">
          <p>You must be logged in to manage FAQs.</p>
        </div>
      )}

      {user && showNewForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Create New FAQ
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNewForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Question</label>
              <Input
                value={newFAQ.question}
                onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                placeholder="Enter the question"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Answer</label>
              <Textarea
                value={newFAQ.answer}
                onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                placeholder="Enter the answer"
                rows={4}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <Input
                value={newFAQ.category}
                onChange={(e) => setNewFAQ({ ...newFAQ, category: e.target.value })}
                placeholder="e.g., general, enrollment, facilities"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Sort Order</label>
              <Input
                type="number"
                value={newFAQ.sort_order}
                onChange={(e) => setNewFAQ({ ...newFAQ, sort_order: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreate} className="gap-2">
                <Save className="h-4 w-4" />
                Create FAQ
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowNewForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {faqs.map((faq) => (
          <FAQCard
            key={faq.id}
            faq={faq}
            isEditing={editingId === faq.id}
            canEdit={canEditFAQ(faq)}
            onEdit={() => setEditingId(faq.id)}
            onCancelEdit={() => setEditingId(null)}
            onUpdate={(updates) => handleUpdate(faq.id, updates)}
            onDelete={() => handleDelete(faq.id)}
            onToggleActive={(isActive) => handleToggleActive(faq.id, isActive)}
          />
        ))}
      </div>

      {faqs.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No FAQs found. {user ? 'Create your first FAQ to get started.' : 'Please log in to manage FAQs.'}</p>
        </div>
      )}
    </div>
  );
};

interface FAQCardProps {
  faq: FAQ;
  isEditing: boolean;
  canEdit: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onUpdate: (updates: Partial<FAQ>) => void;
  onDelete: () => void;
  onToggleActive: (isActive: boolean) => void;
}

const FAQCard = ({
  faq,
  isEditing,
  canEdit,
  onEdit,
  onCancelEdit,
  onUpdate,
  onDelete,
  onToggleActive
}: FAQCardProps) => {
  const [editData, setEditData] = useState({
    question: faq.question,
    answer: faq.answer,
    category: faq.category,
    sort_order: faq.sort_order
  });

  const handleSave = () => {
    onUpdate(editData);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {isEditing ? (
              <Input
                value={editData.question}
                onChange={(e) => setEditData({ ...editData, question: e.target.value })}
                className="text-lg font-semibold"
              />
            ) : (
              <CardTitle className="text-lg">{faq.question}</CardTitle>
            )}
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{faq.category}</Badge>
              <Badge variant={faq.is_active ? 'default' : 'destructive'}>
                {faq.is_active ? 'Active' : 'Inactive'}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Order: {faq.sort_order}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {canEdit && (
              <Switch
                checked={faq.is_active}
                onCheckedChange={onToggleActive}
              />
            )}
            {canEdit && (
              <>
                {isEditing ? (
                  <>
                    <Button size="sm" onClick={handleSave} className="gap-1">
                      <Save className="h-3 w-3" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={onCancelEdit}>
                      <X className="h-3 w-3" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" variant="outline" onClick={onEdit}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={onDelete}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Answer</label>
              <Textarea
                value={editData.answer}
                onChange={(e) => setEditData({ ...editData, answer: e.target.value })}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <Input
                  value={editData.category}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Sort Order</label>
                <Input
                  type="number"
                  value={editData.sort_order}
                  onChange={(e) => setEditData({ ...editData, sort_order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">{faq.answer}</p>
        )}
      </CardContent>
    </Card>
  );
};
