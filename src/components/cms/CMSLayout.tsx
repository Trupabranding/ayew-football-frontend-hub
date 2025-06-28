
import { ReactNode } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ContentStats } from './ContentStats';
import { 
  FileText, 
  Layout, 
  Image, 
  HelpCircle, 
  Settings,
  Users,
  Handshake
} from 'lucide-react';

interface CMSLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
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

export const CMSLayout = ({ children, activeTab, onTabChange, stats }: CMSLayoutProps) => {
  const tabs = [
    { 
      id: 'sections', 
      label: 'Sections', 
      icon: Layout,
      description: 'Manage website sections'
    },
    { 
      id: 'pages', 
      label: 'Pages', 
      icon: FileText,
      description: 'Manage custom pages'
    },
    { 
      id: 'players', 
      label: 'Players', 
      icon: Users,
      description: 'Manage academy players'
    },
    { 
      id: 'partners', 
      label: 'Partners', 
      icon: Handshake,
      description: 'Manage partners & investors'
    },
    { 
      id: 'faqs', 
      label: 'FAQs', 
      icon: HelpCircle,
      description: 'Manage FAQ content'
    },
    { 
      id: 'layout', 
      label: 'Layout', 
      icon: Layout,
      description: 'Customize layout'
    },
    { 
      id: 'media', 
      label: 'Media', 
      icon: Image,
      description: 'Media library'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Content Management</h2>
        <p className="text-muted-foreground">
          Manage your website content, players, and partners
        </p>
      </div>

      <ContentStats stats={stats} />

      <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 h-auto p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex flex-col items-center gap-1 p-3 h-auto text-xs"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="space-y-4">
            {activeTab === tab.id && children}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
