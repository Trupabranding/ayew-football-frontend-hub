import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Handshake, BarChart3, Users, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PartnerDashboard() {
  const stats = [
    { title: 'Total Partnerships', value: '24', icon: Handshake, change: '+5 from last quarter' },
    { title: 'Active Campaigns', value: '8', icon: Activity, change: '3 ending soon' },
    { title: 'Total Reach', value: '1.2M', icon: Users, change: '+15% from last month' },
    { title: 'Revenue Generated', value: '$245K', icon: DollarSign, change: '+22% from last quarter' },
  ];

  const campaigns = [
    {
      id: 1,
      name: 'Summer Collection 2023',
      status: 'active',
      progress: 75,
      startDate: '2023-06-01',
      endDate: '2023-08-31',
    },
    {
      id: 2,
      name: 'Back to School',
      status: 'upcoming',
      progress: 0,
      startDate: '2023-09-01',
      endDate: '2023-10-15',
    },
    {
      id: 3,
      name: 'Holiday Season',
      status: 'planning',
      progress: 25,
      startDate: '2023-11-15',
      endDate: '2024-01-05',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Partner Dashboard</h2>
        <p className="text-muted-foreground">
          Manage your partnerships and track campaign performance
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
              <CardTitle>Campaign Performance</CardTitle>
              <Button variant="outline" size="sm">View Report</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
              <p className="text-muted-foreground">Campaign performance chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active Campaigns</CardTitle>
              <Button size="sm">+ New Campaign</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{campaign.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      campaign.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : campaign.status === 'upcoming'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{campaign.startDate}</span>
                      <span>{campaign.endDate}</span>
                    </div>
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
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mt-1">
                  <Activity className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {i === 1 && 'New partnership request received'}
                    {i === 2 && 'Campaign performance report is ready'}
                    {i === 3 && 'Payment processed successfully'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {i === 1 && 'Acme Corp has sent a partnership request for Q4 campaign'}
                    {i === 2 && 'Your Summer Collection campaign has exceeded expectations'}
                    {i === 3 && 'Payment of $5,200 has been processed for your partnership'}
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
