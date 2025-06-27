
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CMSLayout } from '@/components/cms/CMSLayout';
import { SectionsManager } from '@/components/cms/SectionsManager';
import { PagesManager } from '@/components/cms/PagesManager';
import { PlaceholderTab } from '@/components/cms/PlaceholderTabs';

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState('sections');
  const [stats, setStats] = useState({
    totalSections: 0,
    activeSections: 0,
    totalPages: 0,
    publishedPages: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [sectionsResult, pagesResult] = await Promise.all([
        supabase.from('sections').select('id, is_active'),
        supabase.from('pages').select('id, is_published')
      ]);

      const totalSections = sectionsResult.data?.length || 0;
      const activeSections = sectionsResult.data?.filter(s => s.is_active).length || 0;
      const totalPages = pagesResult.data?.length || 0;
      const publishedPages = pagesResult.data?.filter(p => p.is_published).length || 0;

      setStats({
        totalSections,
        activeSections,
        totalPages,
        publishedPages
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'sections':
        return <SectionsManager onStatsUpdate={fetchStats} />;
      case 'pages':
        return <PagesManager />;
      case 'layout':
        return (
          <PlaceholderTab
            title="Layout Manager"
            description="Manage website layout and component arrangement"
            comingSoonText="Layout manager coming soon..."
          />
        );
      case 'media':
        return (
          <PlaceholderTab
            title="Media Library"
            description="Manage images, videos, and other media files"
            comingSoonText="Media library coming soon..."
          />
        );
      default:
        return null;
    }
  };

  return (
    <CMSLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      stats={stats}
    >
      {renderTabContent()}
    </CMSLayout>
  );
}
