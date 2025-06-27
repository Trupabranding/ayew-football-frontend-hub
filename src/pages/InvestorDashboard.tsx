
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, Award, BarChart3, PieChart, Target } from 'lucide-react';
import Header from '@/components/Header';

const InvestorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isInvestor, setIsInvestor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [investments, setInvestments] = useState({
    totalInvested: 0,
    activeInvestments: 0,
    roi: 0,
    playerProgress: 0
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    checkInvestorAccess();
    fetchInvestmentData();
  }, [user, navigate]);

  const checkInvestorAccess = async () => {
    try {
      const { data, error } = await supabase
        .rpc('has_role', { 
          check_user_id: user?.id, 
          check_role: 'investor' 
        });

      if (error) throw error;
      
      if (!data) {
        navigate('/');
        return;
      }
      
      setIsInvestor(true);
    } catch (error) {
      console.error('Error checking investor access:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const fetchInvestmentData = async () => {
    // Placeholder data - in a real app, this would fetch actual investment data
    setInvestments({
      totalInvested: 25000,
      activeInvestments: 5,
      roi: 12.5,
      playerProgress: 85
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

  if (!isInvestor) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Investor Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your investments and portfolio performance</p>
        </div>

        {/* Investment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${investments.totalInvested.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Lifetime investment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{investments.activeInvestments}</div>
              <p className="text-xs text-muted-foreground">Current investments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ROI</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{investments.roi}%</div>
              <p className="text-xs text-muted-foreground">Return on investment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Player Progress</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{investments.playerProgress}%</div>
              <p className="text-xs text-muted-foreground">Average progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Investment Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Portfolio Overview</CardTitle>
              <CardDescription>View your investment portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-wine-red hover:bg-wine-red/90">
                <PieChart className="mr-2 h-4 w-4" />
                View Portfolio
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Investment Analytics</CardTitle>
              <CardDescription>Detailed performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-wine-red hover:bg-wine-red/90">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">New Investment</CardTitle>
              <CardDescription>Explore investment opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-wine-red hover:bg-wine-red/90">
                <Target className="mr-2 h-4 w-4" />
                New Investment
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Player Development</CardTitle>
              <CardDescription>Track player progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-wine-red hover:bg-wine-red/90">
                <Award className="mr-2 h-4 w-4" />
                Player Progress
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Financial Reports</CardTitle>
              <CardDescription>Download investment reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-wine-red hover:bg-wine-red/90">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Reports
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Support</CardTitle>
              <CardDescription>Contact investment support</CardDescription>
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

export default InvestorDashboard;
