
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Trash2, Edit, Plus, Building2 } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  company_name: string | null;
  email: string;
  phone: string | null;
  partner_type: string;
  tier: string | null;
  logo_url: string | null;
  description: string | null;
  investment_amount: number | null;
  contact_person: string | null;
  is_featured: boolean | null;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
}

const initialPartnerData: Omit<Partner, 'id' | 'created_at' | 'updated_at'> = {
  name: '',
  company_name: null,
  email: '',
  phone: null,
  partner_type: 'partner',
  tier: null,
  logo_url: null,
  description: null,
  investment_amount: null,
  contact_person: null,
  is_featured: false,
  is_active: true,
};

export const PartnersTab = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [newPartner, setNewPartner] = useState(initialPartnerData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error('Error fetching partners:', error);
      toast({
        title: "Error",
        description: "Failed to load partners",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePartner = async (partnerData: Omit<Partner, 'id' | 'created_at' | 'updated_at'>) => {
    setSaving(true);
    try {
      if (editingPartner) {
        const { error } = await supabase
          .from('partners')
          .update({
            ...partnerData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingPartner.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Partner updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('partners')
          .insert([partnerData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Partner created successfully"
        });
      }

      setIsDialogOpen(false);
      setEditingPartner(null);
      setNewPartner(initialPartnerData);
      fetchPartners();
    } catch (error) {
      console.error('Error saving partner:', error);
      toast({
        title: "Error",
        description: "Failed to save partner",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePartner = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this partner?')) return;

    try {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Partner deleted successfully"
      });
      fetchPartners();
    } catch (error) {
      console.error('Error deleting partner:', error);
      toast({
        title: "Error",
        description: "Failed to delete partner",
        variant: "destructive"
      });
    }
  };

  const openEditDialog = (partner: Partner) => {
    setEditingPartner(partner);
    setNewPartner({ ...partner });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingPartner(null);
    setNewPartner(initialPartnerData);
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Partner Management</h3>
          <p className="text-sm text-gray-600">Manage your partners and investors</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPartner ? 'Edit Partner' : 'Add New Partner'}
              </DialogTitle>
            </DialogHeader>
            <PartnerForm
              partner={newPartner}
              onChange={setNewPartner}
              onSave={handleSavePartner}
              onCancel={() => setIsDialogOpen(false)}
              saving={saving}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => (
          <Card key={partner.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{partner.name}</CardTitle>
                  {partner.company_name && (
                    <p className="text-sm text-gray-600">{partner.company_name}</p>
                  )}
                  <p className="text-xs text-gray-500 capitalize">
                    {partner.partner_type}
                    {partner.tier && ` • ${partner.tier}`}
                  </p>
                </div>
                {partner.logo_url ? (
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {partner.investment_amount && (
                <p className="text-sm font-medium text-green-600 mb-2">
                  Investment: ${partner.investment_amount.toLocaleString()}
                </p>
              )}
              {partner.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {partner.description}
                </p>
              )}
              <div className="flex gap-2 mb-3">
                {partner.is_featured && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                    Featured
                  </span>
                )}
                <span className={`px-2 py-1 text-xs rounded ${
                  partner.is_active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {partner.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(partner)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeletePartner(partner.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {partners.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No partners found. Add your first partner!</p>
        </div>
      )}
    </div>
  );
};

interface PartnerFormProps {
  partner: Omit<Partner, 'id' | 'created_at' | 'updated_at'>;
  onChange: (partner: Omit<Partner, 'id' | 'created_at' | 'updated_at'>) => void;
  onSave: (partner: Omit<Partner, 'id' | 'created_at' | 'updated_at'>) => void;
  onCancel: () => void;
  saving: boolean;
}

const PartnerForm = ({ partner, onChange, onSave, onCancel, saving }: PartnerFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(partner);
  };

  const updateField = (field: string, value: any) => {
    onChange({ ...partner, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={partner.name}
            onChange={(e) => updateField('name', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="company_name">Company Name</Label>
          <Input
            id="company_name"
            value={partner.company_name || ''}
            onChange={(e) => updateField('company_name', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={partner.email}
            onChange={(e) => updateField('email', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={partner.phone || ''}
            onChange={(e) => updateField('phone', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="partner_type">Partner Type *</Label>
          <Select value={partner.partner_type} onValueChange={(value) => updateField('partner_type', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="investor">Investor</SelectItem>
              <SelectItem value="sponsor">Sponsor</SelectItem>
              <SelectItem value="partner">Partner</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="tier">Tier</Label>
          <Select value={partner.tier || ''} onValueChange={(value) => updateField('tier', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bronze">Bronze</SelectItem>
              <SelectItem value="silver">Silver</SelectItem>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="platinum">Platinum</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="contact_person">Contact Person</Label>
          <Input
            id="contact_person"
            value={partner.contact_person || ''}
            onChange={(e) => updateField('contact_person', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="investment_amount">Investment Amount</Label>
          <Input
            id="investment_amount"
            type="number"
            step="0.01"
            value={partner.investment_amount || ''}
            onChange={(e) => updateField('investment_amount', e.target.value ? parseFloat(e.target.value) : null)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="logo_url">Logo URL</Label>
        <Input
          id="logo_url"
          value={partner.logo_url || ''}
          onChange={(e) => updateField('logo_url', e.target.value)}
          placeholder="https://example.com/logo.png"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={partner.description || ''}
          onChange={(e) => updateField('description', e.target.value)}
          rows={3}
          placeholder="Partner description..."
        />
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="is_featured"
            checked={partner.is_featured || false}
            onCheckedChange={(checked) => updateField('is_featured', checked)}
          />
          <Label htmlFor="is_featured">Featured Partner</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="is_active"
            checked={partner.is_active !== false}
            onCheckedChange={(checked) => updateField('is_active', checked)}
          />
          <Label htmlFor="is_active">Active</Label>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={saving || !partner.name || !partner.email}>
          {saving ? 'Saving...' : 'Save Partner'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
