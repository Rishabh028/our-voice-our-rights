import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: 'BarChart3',
      description: 'Overview & Analytics'
    },
    { 
      name: 'District Analysis', 
      path: '/district-analysis', 
      icon: 'MapPin',
      description: 'Regional Performance'
    },
    { 
      name: 'Education Center', 
      path: '/education-center', 
      icon: 'BookOpen',
      description: 'Rights & Resources'
    },
    { 
      name: 'Comparison Tool', 
      path: '/comparison-tool', 
      icon: 'GitCompare',
      description: 'Compare Districts'
    },
    { 
      name: 'Data Transparency', 
      path: '/data-transparency', 
      icon: 'Database',
      description: 'Open Data Access'
    },
  ];

  const quickActions = [
    { name: 'Report Issue', icon: 'AlertTriangle', action: 'report' },
    { name: 'Download Data', icon: 'Download', action: 'download' },
    { name: 'Share Insights', icon: 'Share2', action: 'share' },
  ];

  const isActivePath = (path) => location?.pathname === path;
  const shouldExpand = !isCollapsed || isHovered;

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'report': console.log('Opening report issue modal');
        break;
      case 'download':
        console.log('Initiating data download');
        break;
      case 'share': console.log('Opening share dialog');
        break;
      default:
        break;
    }
  };

  return (
    <aside
      className={`lg:fixed left-0 top-16 h-[calc(100vh-4rem)] bg-surface border-r border-border transition-all duration-300 z-40 ${
        shouldExpand ? 'w-64' : 'w-16'
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {shouldExpand && (
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                  <Icon name="Compass" size={16} color="white" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Navigation</h2>
                  <p className="text-xs text-text-secondary">Civic Dashboard</p>
                </div>
              </div>
            )}
            
            {onToggle && (
              <Button
                variant="ghost"
                onClick={onToggle}
                iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
                iconSize={16}
                className="p-1 h-8 w-8"
              />
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          <div className="space-y-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-civic-sm'
                    : 'text-foreground hover:bg-muted hover:text-foreground'
                }`}
                title={!shouldExpand ? item?.name : ''}
              >
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  className={`flex-shrink-0 ${shouldExpand ? 'mr-3' : ''}`}
                />
                
                {shouldExpand && (
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item?.name}</div>
                    <div className={`text-xs opacity-75 ${
                      isActivePath(item?.path) ? 'text-primary-foreground' : 'text-text-secondary'
                    }`}>
                      {item?.description}
                    </div>
                  </div>
                )}
                
                {shouldExpand && isActivePath(item?.path) && (
                  <div className="w-2 h-2 bg-primary-foreground rounded-full ml-2" />
                )}
              </button>
            ))}
          </div>

          {/* Quick Actions Section */}
          {shouldExpand && (
            <div className="pt-6 mt-6 border-t border-border">
              <h3 className="px-3 text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
              <div className="space-y-1">
                {quickActions?.map((action) => (
                  <button
                    key={action?.action}
                    onClick={() => handleQuickAction(action?.action)}
                    className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name={action?.icon} size={16} className="mr-3" />
                    {action?.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border">
          {shouldExpand ? (
            <div className="bg-accent/10 rounded-lg p-3">
              <div className="flex items-center mb-2">
                <Icon name="TrendingUp" size={16} className="text-accent mr-2" />
                <span className="text-sm font-medium text-foreground">Performance</span>
              </div>
              <p className="text-xs text-text-secondary mb-2">
                District ranking improved by 15% this month
              </p>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="ExternalLink"
                iconPosition="right"
                iconSize={14}
                onClick={() => handleNavigation('/dashboard')}
              >
                View Details
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={16} className="text-accent" />
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;