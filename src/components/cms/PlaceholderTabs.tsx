
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PlaceholderTabProps {
  title: string;
  description: string;
  comingSoonText: string;
}

export const PlaceholderTab = ({ title, description, comingSoonText }: PlaceholderTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>{comingSoonText}</p>
            <p className="text-sm">{description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
