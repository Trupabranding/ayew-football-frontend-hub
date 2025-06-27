
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Edit } from 'lucide-react';

interface ContentStatsProps {
  stats: {
    totalSections: number;
    activeSections: number;
    totalPages: number;
    publishedPages: number;
  };
}

export const ContentStats = ({ stats }: ContentStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Sections</p>
              <p className="text-2xl font-bold">{stats.totalSections}</p>
            </div>
            <Badge variant="secondary">{stats.activeSections} Active</Badge>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Pages</p>
              <p className="text-2xl font-bold">{stats.totalPages}</p>
            </div>
            <Badge variant="secondary">{stats.publishedPages} Published</Badge>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Site Status</p>
              <p className="text-sm font-semibold text-green-600">Online</p>
            </div>
            <Globe className="h-5 w-5 text-green-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Update</p>
              <p className="text-sm">{new Date().toLocaleDateString()}</p>
            </div>
            <Edit className="h-5 w-5 text-blue-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
