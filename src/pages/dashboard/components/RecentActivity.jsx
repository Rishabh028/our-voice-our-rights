import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = ({ activities, onViewAll }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'update': return 'RefreshCw';
      case 'alert': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      case 'report': return 'FileText';
      case 'comparison': return 'GitCompare';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'update': return 'text-primary';
      case 'alert': return 'text-warning';
      case 'success': return 'text-success';
      case 'report': return 'text-secondary';
      case 'comparison': return 'text-accent';
      default: return 'text-text-secondary';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="civic-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          iconName="ExternalLink"
          iconSize={14}
        >
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-1">
                    {activity?.title}
                  </p>
                  <p className="text-sm text-text-secondary line-clamp-2">
                    {activity?.description}
                  </p>
                  {activity?.district && (
                    <div className="flex items-center mt-2">
                      <Icon name="MapPin" size={12} className="text-text-secondary mr-1" />
                      <span className="text-xs text-text-secondary">{activity?.district}</span>
                    </div>
                  )}
                </div>
                <div className="text-right ml-4 flex-shrink-0">
                  <span className="text-xs text-text-secondary">
                    {formatTimeAgo(activity?.timestamp)}
                  </span>
                  {activity?.priority === 'high' && (
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-error rounded-full mr-1" />
                      <span className="text-xs text-error font-medium">High</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {activities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={32} className="mx-auto text-text-secondary opacity-50 mb-3" />
          <p className="text-text-secondary">No recent activity</p>
        </div>
      )}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">
            Showing {Math.min(activities?.length, 5)} of {activities?.length} activities
          </span>
          <Button
            variant="ghost"
            size="sm"
            iconName="Bell"
            iconSize={14}
            onClick={() => console.log('Configure notifications')}
          >
            Notifications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;