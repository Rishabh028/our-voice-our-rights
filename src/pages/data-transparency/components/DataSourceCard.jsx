import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataSourceCard = ({ source }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'maintenance': return 'text-warning bg-warning/10';
      case 'delayed': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'CheckCircle';
      case 'maintenance': return 'AlertTriangle';
      case 'delayed': return 'Clock';
      default: return 'HelpCircle';
    }
  };

  return (
    <div className="civic-card p-6 hover:shadow-civic-elevation transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
            <Icon name={source?.icon} size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{source?.name}</h3>
            <p className="text-sm text-text-secondary">{source?.department}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full flex items-center ${getStatusColor(source?.status)}`}>
          <Icon name={getStatusIcon(source?.status)} size={14} className="mr-1" />
          <span className="text-xs font-medium capitalize">{source?.status}</span>
        </div>
      </div>
      <p className="text-sm text-text-secondary mb-4">{source?.description}</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-text-secondary mb-1">Update Frequency</p>
          <p className="text-sm font-medium text-foreground">{source?.updateFrequency}</p>
        </div>
        <div>
          <p className="text-xs text-text-secondary mb-1">Last Updated</p>
          <p className="text-sm font-medium text-foreground">{source?.lastUpdated}</p>
        </div>
        <div>
          <p className="text-xs text-text-secondary mb-1">Data Points</p>
          <p className="text-sm font-medium text-foreground">{source?.dataPoints}</p>
        </div>
        <div>
          <p className="text-xs text-text-secondary mb-1">Accuracy</p>
          <p className="text-sm font-medium text-foreground">{source?.accuracy}%</p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
          iconSize={14}
          onClick={() => window.open(source?.apiUrl, '_blank')}
        >
          API Docs
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="Info"
          iconPosition="left"
          iconSize={14}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default DataSourceCard;