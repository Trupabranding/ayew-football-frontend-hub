
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from './UserMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Players', href: '#players' },
    { name: 'Investment', href: '#investment' },
    { name: 'Donations', href: '#donations' },
    { name: 'Matches', href: '#matches' },
    { name: 'News', href: '#news' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-wine-red text-white p-2 rounded-lg mr-3">
              <span className="font-bold text-xl">MA</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-secondary">Mafarah Ayew</h1>
              <p className="text-sm text-gray-600">Football Academy</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-secondary hover:text-wine-red transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <UserMenu />
            ) : (
              <Link to="/auth">
                <Button className="bg-wine-red hover:bg-wine-red/90 text-white">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-secondary"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-secondary hover:text-wine-red transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t">
                {user ? (
                  <UserMenu />
                ) : (
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button className="bg-wine-red hover:bg-wine-red/90 text-white w-full">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
