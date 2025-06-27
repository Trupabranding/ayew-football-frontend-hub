import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { UserRole } from '@/types/roles';

interface DashboardLayoutProps {
  role: UserRole;
  children?: React.ReactNode;
}

export const DashboardLayout = ({ role, children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role={role} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header role={role} />
        <main className="flex-1 overflow-y-auto p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
