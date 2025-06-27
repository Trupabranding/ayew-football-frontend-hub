import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Trophy, BarChart3, Target, Calendar, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PlayerDashboard() {
  const stats = [
    { title: 'Performance Score', value: '87%', icon: Trophy, change: '+5% from last month' },
    { title: 'Training Hours', value: '42', icon: Activity, change: '+8h from last month' },
    { title: 'Goals Achieved', value: '12/15', icon: Target, change: '80% success rate' },
    { title: 'Upcoming Events', value: '3', icon: Calendar, change: 'Next: Tomorrow' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Player Dashboard</h2>
        <p className="text-muted-foreground">
          Track your performance and training progress
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Performance Metrics</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-md">
              <p className="text-muted-foreground">Performance chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Schedule</CardTitle>
              <Button variant="outline" size="sm">View Calendar</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">Training Session #{i}</p>
                    <p className="text-sm text-muted-foreground">
                      {i === 1 ? 'Tomorrow' : `In ${i} days`} • 10:00 AM - 12:00 PM
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mt-1">
                  <Activity className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {i === 1 && 'New training session completed'}
                    {i === 2 && 'Performance assessment updated'}
                    {i === 3 && 'New message from your coach'}
                    {i === 4 && 'Upcoming match scheduled'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {i === 1 && 'You completed today\'s training session with 95% accuracy'}
                    {i === 2 && 'Your performance score increased by 5% this week'}
                    {i === 3 && 'Coach has sent you feedback on your last session'}
                    {i === 4 && 'Match against Team X scheduled for next Friday'}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {i === 1 ? '2h ago' : `${i}d ago`}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
