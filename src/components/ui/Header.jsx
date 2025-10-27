import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'BarChart3' },
    { name: 'District Analysis', path: '/district-analysis', icon: 'MapPin' },
    { name: 'Education Center', path: '/education-center', icon: 'BookOpen' },
    { name: 'Comparison Tool', path: '/comparison-tool', icon: 'GitCompare' },
  ];

  const moreMenuItems = [
    { name: 'Data Transparency', path: '/data-transparency', icon: 'Database' },
    { name: 'Settings', path: '/settings', icon: 'Settings' },
    { name: 'Help & Support', path: '/help', icon: 'HelpCircle' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`bg-background border-b border-border sticky top-0 z-50 ${className}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <button 
                onClick={() => handleNavigation('/')}
                className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3 transition-transform hover:scale-105"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary-foreground"
                >
                  <path
                    d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                  <path
                    d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z"
                    fill="currentColor"
                  />
                  <path
                    d="M5 9L5.5 11.5L8 12L5.5 12.5L5 15L4.5 12.5L2 12L4.5 11.5L5 9Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Our Voice</h1>
                <p className="text-sm text-text-secondary -mt-1">Our Rights</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActivePath(item?.path) ? "default" : "ghost"}
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={18}
                className="px-4 py-2"
              >
                {item?.name}
              </Button>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <Button
                variant="ghost"
                iconName="MoreHorizontal"
                iconSize={18}
                className="px-4 py-2"
              >
                More
              </Button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-md shadow-civic-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {moreMenuItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted flex items-center transition-colors duration-200"
                    >
                      <Icon name={item?.icon} size={16} className="mr-3" />
                      {item?.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="Bell"
              iconSize={18}
              className="px-3"
            >
              Alerts
            </Button>
            
            <Button
              variant="default"
              iconName="User"
              iconPosition="left"
              iconSize={18}
            >
              My Profile
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={toggleMobileMenu}
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              iconSize={20}
              className="px-2"
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center transition-colors duration-200 ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} className="mr-3" />
                  {item?.name}
                </button>
              ))}
              
              <div className="border-t border-border pt-2 mt-2">
                {moreMenuItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted flex items-center transition-colors duration-200"
                  >
                    <Icon name={item?.icon} size={18} className="mr-3" />
                    {item?.name}
                  </button>
                ))}
              </div>
              
              <div className="border-t border-border pt-2 mt-2 space-y-2">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Bell"
                  iconPosition="left"
                  iconSize={18}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Notifications
                </Button>
                
                <Button
                  variant="default"
                  fullWidth
                  iconName="User"
                  iconPosition="left"
                  iconSize={18}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Profile
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;