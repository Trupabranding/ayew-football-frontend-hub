
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Layout, Users, Handshake, HelpCircle } from 'lucide-react';

interface ContentStatsProps {
  stats: {
    totalSections: number;
    activeSections: number;
    totalPages: number;
    publishedPages: number;
    totalPlayers?: number;
    featuredPlayers?: number;
    totalPartners?: number;
    activePartners?: number;
  };
}

export const ContentStats = ({ stats }: ContentStatsProps) => {
  const statCards = [
    {
      title: 'Sections',
      value: `${stats.activeSections}/${stats.totalSections}`,
      description: 'Active sections',
      icon: Layout,
      color: 'text-blue-600'
    },
    {
      title: 'Pages',
      value: `${stats.publishedPages}/${stats.totalPages}`,
      description: 'Published pages',
      icon: FileText,
      color: 'text-green-600'
    },
    {
      title: 'Players',
      value: `${stats.featuredPlayers || 0}/${stats.totalPlayers || 0}`,
      description: 'Featured players',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Partners',
      value: `${stats.activePartners || 0}/${stats.totalPartners || 0}`,
      description: 'Active partners',
      icon: Handshake,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
