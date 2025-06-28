
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CMSLayout } from '@/components/cms/CMSLayout';
import { SectionsManager } from '@/components/cms/SectionsManager';
import { PagesManager } from '@/components/cms/PagesManager';
import { PlaceholderTab } from '@/components/cms/PlaceholderTabs';
import { FAQsTab } from '@/components/cms/FAQsTab';
import { PlayersTab } from '@/components/cms/PlayersTab';
import { PartnersTab } from '@/components/cms/PartnersTab';

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState('sections');
  const [stats, setStats] = useState({
    totalSections: 0,
    activeSections: 0,
    totalPages: 0,
    publishedPages: 0,
    totalPlayers: 0,
    featuredPlayers: 0,
    totalPartners: 0,
    activePartners: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [sectionsResult, pagesResult, playersResult, partnersResult] = await Promise.all([
        supabase.from('sections').select('id, is_active'),
        supabase.from('pages').select('id, is_published'),
        supabase.from('players').select('id, is_featured'),
        supabase.from('partners').select('id, is_active')
      ]);

      const totalSections = sectionsResult.data?.length || 0;
      const activeSections = sectionsResult.data?.filter(s => s.is_active).length || 0;
      const totalPages = pagesResult.data?.length || 0;
      const publishedPages = pagesResult.data?.filter(p => p.is_published).length || 0;
      const totalPlayers = playersResult.data?.length || 0;
      const featuredPlayers = playersResult.data?.filter(p => p.is_featured).length || 0;
      const totalPartners = partnersResult.data?.length || 0;
      const activePartners = partnersResult.data?.filter(p => p.is_active).length || 0;

      setStats({
        totalSections,
        activeSections,
        totalPages,
        publishedPages,
        totalPlayers,
        featuredPlayers,
        totalPartners,
        activePartners
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
      case 'players':
        return <PlayersTab />;
      case 'partners':
        return <PartnersTab />;
      case 'faqs':
        return <FAQsTab />;
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
