
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Calendar, Target, TrendingUp, Users, Activity } from 'lucide-react';
import Header from '@/components/Header';

const PlayerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isPlayer, setIsPlayer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [playerStats, setPlayerStats] = useState({
    matchesPlayed: 0,
    goalsScored: 0,
    assists: 0,
    trainingHours: 0,
    upcomingMatches: 0,
    skillRating: 0
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    checkPlayerAccess();
    fetchPlayerData();
  }, [user, navigate]);

  const checkPlayerAccess = async () => {
    try {
      const { data, error } = await supabase
        .rpc('has_role', { 
          check_user_id: user?.id, 
          check_role: 'player' 
        });

      if (error) throw error;
      
      if (!data) {
        navigate('/');
        return;
      }
      
      setIsPlayer(true);
    } catch (error) {
      console.error('Error checking player access:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const fetchPlayerData = async () => {
    // Placeholder data - in a real app, this would fetch actual player statistics
    setPlayerStats({
      matchesPlayed: 12,
      goalsScored: 8,
      assists: 5,
      trainingHours: 45,
      upcomingMatches: 3,
      skillRating: 78
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

  if (!isPlayer) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Player Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your performance and development</p>
        </div>

        {/* Player Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Matches Played</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{playerStats.matchesPlayed}</div>
              <p className="text-xs text-muted-foreground">This season</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Goals Scored</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{playerStats.goalsScored}</div>
              <p className="text-xs text-muted-foreground">This season</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assists</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{playerStats.assists}</div>
              <p className="text-xs text-muted-foreground">This season</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Training Hours</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{playerStats.trainingHours}h</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Matches</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{playerStats.upcomingMatches}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Skill Rating</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{playerStats.skillRating}/100</div>
              <p className="text-xs text-muted-foreground">Current rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Player Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Training Schedule</CardTitle>
              <CardDescription>View your training sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-wine-red hover:bg-wine-red/90">
                <Calendar className="mr-2 h-4 w-4" />
                View Schedule
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Analytics</CardTitle>
              <CardDescription>Track your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-wine-red hover:bg-wine-red/90">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Match History</CardTitle>
              <CardDescription>Review past performances</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-wine-red hover:bg-wine-red/90">
                <Users className="mr-2 h-4 w-4" />
                Match History
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Goals & Targets</CardTitle>
              <CardDescription>Set and track your goals</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-wine-red hover:bg-wine-red/90">
                <Target className="mr-2 h-4 w-4" />
                Set Goals
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Development Plan</CardTitle>
              <CardDescription>Your personalized development path</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-wine-red hover:bg-wine-red/90">
                <Award className="mr-2 h-4 w-4" />
                View Plan
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Coach Feedback</CardTitle>
              <CardDescription>Review coaching notes</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Feedback
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;
