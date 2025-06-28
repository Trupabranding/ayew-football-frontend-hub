
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
import { Trash2, Edit, Plus, Upload } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  position: string | null;
  nationality: string | null;
  date_of_birth: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  photo_url: string | null;
  cv_url: string | null;
  highlight_video_url: string | null;
  bio: string | null;
  goals: number | null;
  assists: number | null;
  appearances: number | null;
  saves: number | null;
  is_featured: boolean | null;
  is_visible_homepage: boolean | null;
  season: string | null;
  squad: string | null;
  created_at: string;
  updated_at: string;
}

const initialPlayerData: Omit<Player, 'id' | 'created_at' | 'updated_at'> = {
  name: '',
  position: null,
  nationality: null,
  date_of_birth: null,
  height_cm: null,
  weight_kg: null,
  photo_url: null,
  cv_url: null,
  highlight_video_url: null,
  bio: null,
  goals: 0,
  assists: 0,
  appearances: 0,
  saves: 0,
  is_featured: false,
  is_visible_homepage: true,
  season: null,
  squad: null,
};

export const PlayersTab = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [newPlayer, setNewPlayer] = useState(initialPlayerData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPlayers(data || []);
    } catch (error) {
      console.error('Error fetching players:', error);
      toast({
        title: "Error",
        description: "Failed to load players",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePlayer = async (playerData: Omit<Player, 'id' | 'created_at' | 'updated_at'>) => {
    setSaving(true);
    try {
      if (editingPlayer) {
        const { error } = await supabase
          .from('players')
          .update({
            ...playerData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingPlayer.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Player updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('players')
          .insert([playerData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Player created successfully"
        });
      }

      setIsDialogOpen(false);
      setEditingPlayer(null);
      setNewPlayer(initialPlayerData);
      fetchPlayers();
    } catch (error) {
      console.error('Error saving player:', error);
      toast({
        title: "Error",
        description: "Failed to save player",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePlayer = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this player?')) return;

    try {
      const { error } = await supabase
        .from('players')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Player deleted successfully"
      });
      fetchPlayers();
    } catch (error) {
      console.error('Error deleting player:', error);
      toast({
        title: "Error",
        description: "Failed to delete player",
        variant: "destructive"
      });
    }
  };

  const openEditDialog = (player: Player) => {
    setEditingPlayer(player);
    setNewPlayer({ ...player });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingPlayer(null);
    setNewPlayer(initialPlayerData);
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
          <h3 className="text-lg font-semibold">Player Management</h3>
          <p className="text-sm text-gray-600">Manage your academy players</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Player
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPlayer ? 'Edit Player' : 'Add New Player'}
              </DialogTitle>
            </DialogHeader>
            <PlayerForm
              player={newPlayer}
              onChange={setNewPlayer}
              onSave={handleSavePlayer}
              onCancel={() => setIsDialogOpen(false)}
              saving={saving}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {players.map((player) => (
          <Card key={player.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{player.name}</CardTitle>
                  <p className="text-sm text-gray-600">
                    {player.position} • {player.nationality}
                  </p>
                  {player.season && (
                    <p className="text-xs text-gray-500">Season: {player.season}</p>
                  )}
                </div>
                {player.photo_url && (
                  <img
                    src={player.photo_url}
                    alt={player.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                <span>Goals: {player.goals || 0}</span>
                <span>Assists: {player.assists || 0}</span>
                <span>Apps: {player.appearances || 0}</span>
              </div>
              <div className="flex gap-2 mb-3">
                {player.is_featured && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                    Featured
                  </span>
                )}
                {player.is_visible_homepage && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                    Visible
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(player)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeletePlayer(player.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {players.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No players found. Add your first player!</p>
        </div>
      )}
    </div>
  );
};

interface PlayerFormProps {
  player: Omit<Player, 'id' | 'created_at' | 'updated_at'>;
  onChange: (player: Omit<Player, 'id' | 'created_at' | 'updated_at'>) => void;
  onSave: (player: Omit<Player, 'id' | 'created_at' | 'updated_at'>) => void;
  onCancel: () => void;
  saving: boolean;
}

const PlayerForm = ({ player, onChange, onSave, onCancel, saving }: PlayerFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(player);
  };

  const updateField = (field: string, value: any) => {
    onChange({ ...player, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={player.name}
            onChange={(e) => updateField('name', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="position">Position</Label>
          <Select value={player.position || ''} onValueChange={(value) => updateField('position', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
              <SelectItem value="Defender">Defender</SelectItem>
              <SelectItem value="Midfielder">Midfielder</SelectItem>
              <SelectItem value="Forward">Forward</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="nationality">Nationality</Label>
          <Input
            id="nationality"
            value={player.nationality || ''}
            onChange={(e) => updateField('nationality', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="date_of_birth">Date of Birth</Label>
          <Input
            id="date_of_birth"
            type="date"
            value={player.date_of_birth || ''}
            onChange={(e) => updateField('date_of_birth', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="height_cm">Height (cm)</Label>
          <Input
            id="height_cm"
            type="number"
            value={player.height_cm || ''}
            onChange={(e) => updateField('height_cm', e.target.value ? parseInt(e.target.value) : null)}
          />
        </div>
        <div>
          <Label htmlFor="weight_kg">Weight (kg)</Label>
          <Input
            id="weight_kg"
            type="number"
            value={player.weight_kg || ''}
            onChange={(e) => updateField('weight_kg', e.target.value ? parseInt(e.target.value) : null)}
          />
        </div>
        <div>
          <Label htmlFor="season">Season</Label>
          <Input
            id="season"
            value={player.season || ''}
            onChange={(e) => updateField('season', e.target.value)}
            placeholder="e.g., 2024/25"
          />
        </div>
        <div>
          <Label htmlFor="squad">Squad</Label>
          <Input
            id="squad"
            value={player.squad || ''}
            onChange={(e) => updateField('squad', e.target.value)}
            placeholder="e.g., First Team, U21"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="goals">Goals</Label>
          <Input
            id="goals"
            type="number"
            value={player.goals || 0}
            onChange={(e) => updateField('goals', parseInt(e.target.value) || 0)}
          />
        </div>
        <div>
          <Label htmlFor="assists">Assists</Label>
          <Input
            id="assists"
            type="number"
            value={player.assists || 0}
            onChange={(e) => updateField('assists', parseInt(e.target.value) || 0)}
          />
        </div>
        <div>
          <Label htmlFor="appearances">Appearances</Label>
          <Input
            id="appearances"
            type="number"
            value={player.appearances || 0}
            onChange={(e) => updateField('appearances', parseInt(e.target.value) || 0)}
          />
        </div>
        <div>
          <Label htmlFor="saves">Saves</Label>
          <Input
            id="saves"
            type="number"
            value={player.saves || 0}
            onChange={(e) => updateField('saves', parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="photo_url">Photo URL</Label>
          <Input
            id="photo_url"
            value={player.photo_url || ''}
            onChange={(e) => updateField('photo_url', e.target.value)}
            placeholder="https://example.com/photo.jpg"
          />
        </div>
        <div>
          <Label htmlFor="cv_url">CV URL</Label>
          <Input
            id="cv_url"
            value={player.cv_url || ''}
            onChange={(e) => updateField('cv_url', e.target.value)}
            placeholder="https://example.com/cv.pdf"
          />
        </div>
        <div>
          <Label htmlFor="highlight_video_url">Highlight Video URL</Label>
          <Input
            id="highlight_video_url"
            value={player.highlight_video_url || ''}
            onChange={(e) => updateField('highlight_video_url', e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>
        <div>
          <Label htmlFor="bio">Biography</Label>
          <Textarea
            id="bio"
            value={player.bio || ''}
            onChange={(e) => updateField('bio', e.target.value)}
            rows={4}
            placeholder="Player biography..."
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="is_featured"
            checked={player.is_featured || false}
            onCheckedChange={(checked) => updateField('is_featured', checked)}
          />
          <Label htmlFor="is_featured">Featured Player</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="is_visible_homepage"
            checked={player.is_visible_homepage !== false}
            onCheckedChange={(checked) => updateField('is_visible_homepage', checked)}
          />
          <Label htmlFor="is_visible_homepage">Visible on Homepage</Label>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={saving || !player.name}>
          {saving ? 'Saving...' : 'Save Player'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
