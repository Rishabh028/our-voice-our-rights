import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionClick }) => {
  const actions = [
    {
      id: 'compare',
      title: 'Compare Districts',
      description: 'Side-by-side performance analysis',
      icon: 'GitCompare',
      color: 'bg-primary',
      route: '/comparison-tool'
    },
    {
      id: 'report',
      title: 'Generate Report',
      description: 'Download detailed analytics',
      icon: 'FileText',
      color: 'bg-secondary',
      action: 'generate-report'
    },
    {
      id: 'analyze',
      title: 'District Analysis',
      description: 'Deep dive into regional data',
      icon: 'BarChart3',
      color: 'bg-accent',
      route: '/district-analysis'
    },
    {
      id: 'transparency',
      title: 'Data Sources',
      description: 'View data transparency info',
      icon: 'Database',
      color: 'bg-warning',
      route: '/data-transparency'
    }
  ];

  const handleActionClick = (action) => {
    if (action?.route) {
      window.location.href = action?.route;
    } else if (action?.action) {
      onActionClick(action?.action);
    }
  };

  return (
    <div className="civic-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <Icon name="Zap" size={20} className="text-primary" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleActionClick(action)}
            className="p-4 rounded-lg border border-border hover:border-primary/50 hover:shadow-civic-sm transition-all duration-200 text-left group"
          >
            <div className="flex items-start">
              <div className={`w-10 h-10 ${action?.color} rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-200`}>
                <Icon name={action?.icon} size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                  {action?.title}
                </h4>
                <p className="text-sm text-text-secondary">{action?.description}</p>
              </div>
              <Icon name="ArrowRight" size={16} className="text-text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
            <span className="text-sm text-text-secondary">Data updated 5 minutes ago</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            iconSize={14}
            onClick={() => onActionClick('refresh-data')}
          >
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;