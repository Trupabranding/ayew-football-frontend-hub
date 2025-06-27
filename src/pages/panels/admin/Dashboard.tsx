
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  DollarSign, 
  Activity, 
  TrendingUp, 
  FileText, 
  Globe,
  Eye,
  Plus,
  Edit
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Statistic {
  id: string;
  metric_name: string;
  metric_value: number;
  metric_date: string;
  created_at: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  is_published: boolean;
  published_at: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch statistics
      const { data: statsData, error: statsError } = await supabase
        .from('site_statistics')
        .select('*')
        .order('created_at', { ascending: false });

      if (statsError) {
        console.error('Error fetching statistics:', statsError);
        toast({
          title: "Error",
          description: "Failed to load dashboard statistics",
          variant: "destructive"
        });
      } else {
        setStatistics(statsData || []);
      }

      // Fetch recent blog posts
      const { data: blogData, error: blogError } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, is_published, published_at, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (blogError) {
        console.error('Error fetching blog posts:', blogError);
        toast({
          title: "Error",
          description: "Failed to load blog posts",
          variant: "destructive"
        });
      } else {
        setBlogPosts(blogData || []);
      }
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Convert statistics array to object for easy lookup
  const statsMap = statistics.reduce((acc, stat) => {
    acc[stat.metric_name] = stat.metric_value;
    return acc;
  }, {} as Record<string, number>);

  const mainStats = [
    { 
      title: 'Total Users', 
      value: statsMap.total_users?.toString() || '0', 
      icon: Users, 
      change: '+12% from last month',
      color: 'text-blue-600'
    },
    { 
      title: 'Monthly Visitors', 
      value: statsMap.monthly_visitors?.toString() || '0', 
      icon: Eye, 
      change: '+19% from last month',
      color: 'text-green-600'
    },
    { 
      title: 'Active Players', 
      value: statsMap.total_players?.toString() || '0', 
      icon: Activity, 
      change: '+8% from last month',
      color: 'text-orange-600'
    },
    { 
      title: 'Total Investments', 
      value: statsMap.total_investments?.toString() || '0', 
      icon: TrendingUp, 
      change: '+25% from last month',
      color: 'text-purple-600'
    },
  ];

  const additionalStats = [
    { title: 'Total Matches', value: statsMap.total_matches || 0 },
    { title: 'Blog Posts', value: statsMap.blog_posts || 0 },
    { title: 'Active Programs', value: statsMap.active_programs || 0 },
    { title: 'Scholarship Recipients', value: statsMap.scholarship_recipients || 0 },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your academy.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/content">
            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              Manage Content
            </Button>
          </Link>
          <Link to="/admin/blog">
            <Button variant="outline" className="gap-2">
              <Edit className="h-4 w-4" />
              Blog Management
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mainStats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Additional Statistics */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Academy Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {additionalStats.map((stat, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{stat.title}</span>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Blog Posts */}
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Blog Posts</CardTitle>
            <Link to="/admin/blog">
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blogPosts.length > 0 ? (
                blogPosts.map((post) => (
                  <div key={post.id} className="flex items-start space-x-4 border-b pb-4 last:border-b-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium leading-none">{post.title}</h4>
                        {post.is_published ? (
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                            Draft
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {post.excerpt?.substring(0, 100)}...
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {post.published_at 
                          ? new Date(post.published_at).toLocaleDateString()
                          : new Date(post.created_at).toLocaleDateString()
                        }
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No blog posts yet. Create your first post!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center p-6">
            <Globe className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <h3 className="font-semibold">Manage Pages</h3>
              <p className="text-sm text-muted-foreground">Update website content</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center p-6">
            <FileText className="h-8 w-8 text-green-600 mr-4" />
            <div>
              <h3 className="font-semibold">Blog Management</h3>
              <p className="text-sm text-muted-foreground">Create and edit posts</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-purple-600 mr-4" />
            <div>
              <h3 className="font-semibold">User Management</h3>
              <p className="text-sm text-muted-foreground">Manage user accounts</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center p-6">
            <TrendingUp className="h-8 w-8 text-orange-600 mr-4" />
            <div>
              <h3 className="font-semibold">Analytics</h3>
              <p className="text-sm text-muted-foreground">View detailed reports</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
