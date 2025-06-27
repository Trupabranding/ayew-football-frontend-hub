import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Users, BarChart3, PieChart, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function InvestorDashboard() {
  const stats = [
    { title: 'Total Invested', value: '$42,500', icon: DollarSign, change: '+5.2% from last month' },
    { title: 'ROI', value: '12.5%', icon: TrendingUp, change: '+2.1% from last month' },
    { title: 'Active Investments', value: '8', icon: Users, change: '+2 from last month' },
    { title: 'Player Progress', value: '78%', icon: BarChart3, change: '+8% from last month' },
  ];

  const actions = [
    {
      title: 'Portfolio Overview',
      description: 'View your investment portfolio and performance metrics',
      icon: PieChart,
      buttonText: 'View Portfolio',
      href: '/investor/portfolio'
    },
    {
      title: 'Investment Analytics',
      description: 'Detailed analytics and performance reports',
      icon: BarChart3,
      buttonText: 'View Analytics',
      href: '/investor/analytics'
    },
    {
      title: 'New Investment',
      description: 'Explore new investment opportunities',
      icon: Target,
      buttonText: 'Invest Now',
      href: '/investor/new-investment'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Investor Dashboard</h2>
        <p className="text-muted-foreground">
          Track your investments and portfolio performance
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {actions.map((action, i) => (
          <Card key={i} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <action.icon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{action.title}</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
            </CardHeader>
            <div className="mt-auto p-6 pt-0">
              <Button className="w-full">
                {action.buttonText}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Investment Update #{i}</p>
                    <p className="text-sm text-muted-foreground">
                      Your investment in Player {i} has been updated
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {i}d ago
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-md">
              <p className="text-muted-foreground">Portfolio chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
