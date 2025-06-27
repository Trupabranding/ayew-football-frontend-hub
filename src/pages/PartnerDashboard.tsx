
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Handshake, Calendar, FileText, Users, TrendingUp, Globe } from 'lucide-react';
import Header from '@/components/Header';

const PartnerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isPartner, setIsPartner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [partnerStats, setPartnerStats] = useState({
    activePartnerships: 0,
    totalContributions: 0,
    eventsHosted: 0,
    playersSupported: 0,
    partnershipValue: 0,
    upcomingEvents: 0
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    checkPartnerAccess();
    fetchPartnerData();
  }, [user, navigate]);

  const checkPartnerAccess = async () => {
    try {
      const { data, error } = await supabase
        .rpc('has_role', { 
          check_user_id: user?.id, 
          check_role: 'partner' 
        });

      if (error) throw error;
      
      if (!data) {
        navigate('/');
        return;
      }
      
      setIsPartner(true);
    } catch (error) {
      console.error('Error checking partner access:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const fetchPartnerData = async () => {
    // Placeholder data - in a real app, this would fetch actual partner data
    setPartnerStats({
      activePartnerships: 3,
      totalContributions: 15000,
      eventsHosted: 8,
      playersSupported: 25,
      partnershipValue: 50000,
      upcomingEvents: 2
    });
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

  if (!isPartner) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Partner Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your partnerships and collaborations</p>
        </div>

        {/* Partner Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Partnerships</CardTitle>
              <Handshake className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{partnerStats.activePartnerships}</div>
              <p className="text-xs text-muted-foreground">Current partnerships</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contributions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${partnerStats.totalContributions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events Hosted</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{partnerStats.eventsHosted}</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Players Supported</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{partnerStats.playersSupported}</div>
              <p className="text-xs text-muted-foreground">Through programs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Partnership Value</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${partnerStats.partnershipValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{partnerStats.upcomingEvents}</div>
              <p className="text-xs text-muted-foreground">Next month</p>
            </CardContent>
          </Card>
        </div>

        {/* Partner Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Partnership Overview</CardTitle>
              <CardDescription>View all your partnerships</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-wine-red hover:bg-wine-red/90">
                <Handshake className="mr-2 h-4 w-4" />
                View Partnerships
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Event Management</CardTitle>
              <CardDescription>Manage sponsored events</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-wine-red hover:bg-wine-red/90">
                <Calendar className="mr-2 h-4 w-4" />
                Manage Events
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Impact Reports</CardTitle>
              <CardDescription>View partnership impact</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-wine-red hover:bg-wine-red/90">
                <FileText className="mr-2 h-4 w-4" />
                View Reports
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Player Programs</CardTitle>
              <CardDescription>Support player development</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-wine-red hover:bg-wine-red/90">
                <Users className="mr-2 h-4 w-4" />
                View Programs
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">New Opportunities</CardTitle>
              <CardDescription>Explore partnership opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-wine-red hover:bg-wine-red/90">
                <Globe className="mr-2 h-4 w-4" />
                Explore
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Support</CardTitle>
              <CardDescription>Get partnership support</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
