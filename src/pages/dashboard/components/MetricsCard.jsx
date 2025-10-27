import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, description, trend }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-text-secondary';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="civic-card p-6 hover:shadow-civic-elevation transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
            <Icon name={icon} size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-1">{title}</h3>
            <p className="text-2xl font-bold text-foreground">{value}</p>
          </div>
        </div>
        <div className={`flex items-center ${getChangeColor()}`}>
          <Icon name={getChangeIcon()} size={16} className="mr-1" />
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-text-secondary">{description}</p>
        {trend && (
          <div className="flex items-center">
            <div className="w-16 h-8 bg-muted rounded flex items-center justify-center">
              <div className="flex space-x-1">
                {trend?.map((point, index) => (
                  <div
                    key={index}
                    className={`w-1 rounded-full ${
                      point > 50 ? 'bg-success h-4' : point > 25 ? 'bg-warning h-3' : 'bg-error h-2'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;