
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, Calendar, DollarSign, Award, Globe } from 'lucide-react';
import Header from '@/components/Header';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPlayers: 0,
    totalInvestors: 0,
    totalPartners: 0,
    activeMatches: 0,
    totalDonations: 0
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    checkAdminAccess();
    fetchDashboardStats();
  }, [user, navigate]);

  const checkAdminAccess = async () => {
    try {
      const { data, error } = await supabase
        .rpc('has_role', { 
          check_user_id: user?.id, 
          check_role: 'admin' 
        });

      if (error) throw error;
      
      if (!data) {
        navigate('/');
        return;
      }
      
      setIsAdmin(true);
    } catch (error) {
      console.error('Error checking admin access:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      // Fetch user counts by role
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('role');

      if (rolesError) throw rolesError;

      const roleCounts = userRoles?.reduce((acc, { role }) => {
        acc[role] = (acc[role] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id');

      if (profilesError) throw profilesError;

      setStats({
        totalUsers: profiles?.length || 0,
        totalPlayers: roleCounts.player || 0,
        totalInvestors: roleCounts.investor || 0,
        totalPartners: roleCounts.partner || 0,
        activeMatches: 0, // Placeholder
        totalDonations: 0 // Placeholder
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your football academy</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Players</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPlayers}</div>
              <p className="text-xs text-muted-foreground">Academy players</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Investors</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalInvestors}</div>
              <p className="text-xs text-muted-foreground">Active investors</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Partners</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPartners}</div>
              <p className="text-xs text-muted-foreground">Academy partners</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Matches</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeMatches}</div>
              <p className="text-xs text-muted-foreground">Scheduled matches</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalDonations}</div>
              <p className="text-xs text-muted-foreground">Lifetime donations</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">User Management</CardTitle>
              <CardDescription>Manage users and roles</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-wine-red hover:bg-wine-red/90">
                Manage Users
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Player Management</CardTitle>
              <CardDescription>Manage academy players</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-wine-red hover:bg-wine-red/90">
                Manage Players
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Match Management</CardTitle>
              <CardDescription>Schedule and manage matches</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-wine-red hover:bg-wine-red/90">
                Manage Matches
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Financial Reports</CardTitle>
              <CardDescription>View financial analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-wine-red hover:bg-wine-red/90">
                View Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
