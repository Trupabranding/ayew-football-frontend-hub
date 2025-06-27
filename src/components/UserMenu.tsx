
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { User, LogOut, Settings, BarChart3, TrendingUp, Award, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserRoles {
  admin: boolean;
  investor: boolean;
  player: boolean;
  partner: boolean;
}

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [userRoles, setUserRoles] = useState<UserRoles>({
    admin: false,
    investor: false,
    player: false,
    partner: false
  });

  useEffect(() => {
    if (user) {
      fetchUserRoles();
    }
  }, [user]);

  const fetchUserRoles = async () => {
    if (!user) return;

    try {
      const roles = ['admin', 'investor', 'player', 'partner'] as const;
      const roleChecks = await Promise.all(
        roles.map(async (role) => {
          const { data, error } = await supabase
            .rpc('has_role', { 
              check_user_id: user.id, 
              check_role: role 
            });
          
          if (error) {
            console.error(`Error checking ${role} role:`, error);
            return { role, hasRole: false };
          }
          
          return { role, hasRole: data || false };
        })
      );

      const rolesObject = roleChecks.reduce((acc, { role, hasRole }) => {
        acc[role] = hasRole;
        return acc;
      }, {} as UserRoles);

      setUserRoles(rolesObject);
    } catch (error) {
      console.error('Error fetching user roles:', error);
    }
  };

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
  };

  const dashboardLinks = [
    {
      condition: userRoles.admin,
      to: '/admin-dashboard',
      icon: Shield,
      label: 'Admin Dashboard',
      description: 'Manage academy operations'
    },
    {
      condition: userRoles.investor,
      to: '/investor-dashboard',
      icon: TrendingUp,
      label: 'Investor Dashboard',
      description: 'Track investments'
    },
    {
      condition: userRoles.player,
      to: '/player-dashboard',
      icon: Award,
      label: 'Player Dashboard',
      description: 'View performance'
    },
    {
      condition: userRoles.partner,
      to: '/partner-dashboard',
      icon: Globe,
      label: 'Partner Dashboard',
      description: 'Manage partnerships'
    }
  ];

  const availableDashboards = dashboardLinks.filter(link => link.condition);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <User size={16} />
          <span className="hidden sm:inline">
            {user.user_metadata?.first_name || user.email}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
        <div className="space-y-2">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">
              {user.user_metadata?.first_name} {user.user_metadata?.last_name}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          
          {availableDashboards.length > 0 && (
            <>
              <hr />
              <div className="px-2 py-1">
                <p className="text-xs font-medium text-gray-600 mb-2">DASHBOARDS</p>
                {availableDashboards.map((dashboard) => (
                  <Link 
                    key={dashboard.to} 
                    to={dashboard.to}
                    onClick={() => setOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2 h-auto p-2 mb-1"
                    >
                      <dashboard.icon size={16} />
                      <div className="text-left">
                        <div className="text-sm font-medium">{dashboard.label}</div>
                        <div className="text-xs text-gray-500">{dashboard.description}</div>
                      </div>
                    </Button>
                  </Link>
                ))}
              </div>
            </>
          )}
          
          <hr />
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={() => setOpen(false)}
          >
            <Settings size={16} />
            Settings
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-red-600 hover:text-red-700"
            onClick={handleSignOut}
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserMenu;
