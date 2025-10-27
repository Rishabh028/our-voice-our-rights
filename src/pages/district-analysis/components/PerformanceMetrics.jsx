import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceMetrics = ({ district }) => {
  const metrics = [
    {
      id: 'job-cards',
      title: 'Job Cards Issued',
      value: '2,45,678',
      target: '2,80,000',
      percentage: 87.7,
      trend: 'up',
      change: '+12.3%',
      icon: 'CreditCard',
      color: 'blue'
    },
    {
      id: 'employment-days',
      title: 'Employment Days Generated',
      value: '45,23,456',
      target: '50,00,000',
      percentage: 90.5,
      trend: 'up',
      change: '+8.7%',
      icon: 'Calendar',
      color: 'green'
    },
    {
      id: 'wage-payments',
      title: 'Wage Payments (₹ Crores)',
      value: '₹ 234.56',
      target: '₹ 280.00',
      percentage: 83.8,
      trend: 'up',
      change: '+15.2%',
      icon: 'IndianRupee',
      color: 'orange'
    },
    {
      id: 'works-completed',
      title: 'Works Completed',
      value: '1,234',
      target: '1,500',
      percentage: 82.3,
      trend: 'down',
      change: '-2.1%',
      icon: 'CheckCircle',
      color: 'purple'
    },
    {
      id: 'women-participation',
      title: 'Women Participation',
      value: '67.8%',
      target: '50.0%',
      percentage: 135.6,
      trend: 'up',
      change: '+5.4%',
      icon: 'Users',
      color: 'pink'
    },
    {
      id: 'transparency-score',
      title: 'Transparency Score',
      value: '8.4/10',
      target: '9.0/10',
      percentage: 93.3,
      trend: 'up',
      change: '+0.3',
      icon: 'Shield',
      color: 'teal'
    }
  ];

  const getColorClasses = (color, percentage) => {
    const baseColors = {
      blue: percentage >= 90 ? 'text-blue-600 bg-blue-50 border-blue-200' : percentage >= 70 ? 'text-blue-500 bg-blue-25 border-blue-100' : 'text-blue-400 bg-blue-10 border-blue-50',
      green: percentage >= 90 ? 'text-green-600 bg-green-50 border-green-200' : percentage >= 70 ? 'text-green-500 bg-green-25 border-green-100' : 'text-green-400 bg-green-10 border-green-50',
      orange: percentage >= 90 ? 'text-orange-600 bg-orange-50 border-orange-200' : percentage >= 70 ? 'text-orange-500 bg-orange-25 border-orange-100' : 'text-orange-400 bg-orange-10 border-orange-50',
      purple: percentage >= 90 ? 'text-purple-600 bg-purple-50 border-purple-200' : percentage >= 70 ? 'text-purple-500 bg-purple-25 border-purple-100' : 'text-purple-400 bg-purple-10 border-purple-50',
      pink: percentage >= 90 ? 'text-pink-600 bg-pink-50 border-pink-200' : percentage >= 70 ? 'text-pink-500 bg-pink-25 border-pink-100' : 'text-pink-400 bg-pink-10 border-pink-50',
      teal: percentage >= 90 ? 'text-teal-600 bg-teal-50 border-teal-200' : percentage >= 70 ? 'text-teal-500 bg-teal-25 border-teal-100' : 'text-teal-400 bg-teal-10 border-teal-50'
    };
    return baseColors?.[color] || baseColors?.blue;
  };

  const getPerformanceLevel = (percentage) => {
    if (percentage >= 90) return { label: 'Excellent', color: 'text-green-600' };
    if (percentage >= 70) return { label: 'Good', color: 'text-blue-600' };
    if (percentage >= 50) return { label: 'Average', color: 'text-yellow-600' };
    return { label: 'Needs Improvement', color: 'text-red-600' };
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-civic-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Performance Metrics</h2>
          <p className="text-sm text-text-secondary mt-1">
            Key indicators for {district?.name || 'Selected District'} - Updated: 25/10/2025
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={14}
          >
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconSize={14}
            className="p-2"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics?.map((metric) => {
          const performance = getPerformanceLevel(metric?.percentage);
          return (
            <div
              key={metric?.id}
              className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-civic-sm ${getColorClasses(metric?.color, metric?.percentage)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${getColorClasses(metric?.color, metric?.percentage)?.split(' ')?.[1]}`}>
                  <Icon name={metric?.icon} size={20} className={getColorClasses(metric?.color, metric?.percentage)?.split(' ')?.[0]} />
                </div>
                <div className={`flex items-center text-sm font-medium ${metric?.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  <Icon 
                    name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                    size={14} 
                    className="mr-1" 
                  />
                  {metric?.change}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-foreground text-sm">{metric?.title}</h3>
                
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-foreground">{metric?.value}</span>
                  <span className="text-sm text-text-secondary">/ {metric?.target}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className={performance?.color}>{performance?.label}</span>
                    <span className="text-text-secondary">{metric?.percentage?.toFixed(1)}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        metric?.percentage >= 90 ? 'bg-green-500' :
                        metric?.percentage >= 70 ? 'bg-blue-500' :
                        metric?.percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(metric?.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border/50">
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  iconName="BarChart3"
                  iconPosition="left"
                  iconSize={14}
                  className="text-xs"
                >
                  View Details
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Summary Section */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">4</div>
            <div className="text-sm text-green-700">Metrics Above Target</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <div className="text-sm text-yellow-700">Metrics Need Attention</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">87.2%</div>
            <div className="text-sm text-blue-700">Overall Performance</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;