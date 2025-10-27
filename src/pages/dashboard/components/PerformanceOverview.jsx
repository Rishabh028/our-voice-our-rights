import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceOverview = ({ districtData, onViewDetails }) => {
  const [selectedMetric, setSelectedMetric] = useState('overall');

  const metrics = [
    {
      id: 'overall',
      name: 'Overall Performance',
      value: districtData?.overallScore,
      target: 85,
      icon: 'Target'
    },
    {
      id: 'employment',
      name: 'Employment Generation',
      value: districtData?.employmentScore,
      target: 90,
      icon: 'Users'
    },
    {
      id: 'wages',
      name: 'Wage Payment',
      value: districtData?.wageScore,
      target: 95,
      icon: 'IndianRupee'
    },
    {
      id: 'transparency',
      name: 'Transparency Index',
      value: districtData?.transparencyScore,
      target: 80,
      icon: 'Eye'
    }
  ];

  const getPerformanceColor = (value, target) => {
    const percentage = (value / target) * 100;
    if (percentage >= 90) return 'text-success';
    if (percentage >= 70) return 'text-warning';
    return 'text-error';
  };

  const getPerformanceBg = (value, target) => {
    const percentage = (value / target) * 100;
    if (percentage >= 90) return 'bg-success/10';
    if (percentage >= 70) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const selectedMetricData = metrics?.find(m => m?.id === selectedMetric);
  const progressPercentage = (selectedMetricData?.value / selectedMetricData?.target) * 100;

  return (
    <div className="civic-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Performance Overview</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onViewDetails}
          iconName="ExternalLink"
          iconSize={14}
        >
          View Details
        </Button>
      </div>
      {/* Metric Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
        {metrics?.map((metric) => (
          <button
            key={metric?.id}
            onClick={() => setSelectedMetric(metric?.id)}
            className={`p-3 rounded-lg border transition-all duration-200 text-left ${
              selectedMetric === metric?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center mb-2">
              <Icon 
                name={metric?.icon} 
                size={16} 
                className={selectedMetric === metric?.id ? 'text-primary' : 'text-text-secondary'} 
              />
              <span className={`ml-2 text-xs font-medium ${
                selectedMetric === metric?.id ? 'text-primary' : 'text-text-secondary'
              }`}>
                {metric?.name}
              </span>
            </div>
            <div className={`text-lg font-bold ${getPerformanceColor(metric?.value, metric?.target)}`}>
              {metric?.value}
            </div>
          </button>
        ))}
      </div>
      {/* Selected Metric Details */}
      <div className={`p-4 rounded-lg ${getPerformanceBg(selectedMetricData?.value, selectedMetricData?.target)}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Icon name={selectedMetricData?.icon} size={20} className="text-foreground mr-2" />
            <span className="font-medium text-foreground">{selectedMetricData?.name}</span>
          </div>
          <div className="text-right">
            <span className={`text-xl font-bold ${getPerformanceColor(selectedMetricData?.value, selectedMetricData?.target)}`}>
              {selectedMetricData?.value}
            </span>
            <span className="text-sm text-text-secondary ml-1">/ {selectedMetricData?.target}</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-sm text-text-secondary mb-1">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                progressPercentage >= 90 ? 'bg-success' :
                progressPercentage >= 70 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>
        
        {/* Performance Indicators */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-text-secondary mb-1">This Month</div>
            <div className="font-semibold text-foreground">{selectedMetricData?.value}</div>
          </div>
          <div>
            <div className="text-sm text-text-secondary mb-1">Target</div>
            <div className="font-semibold text-foreground">{selectedMetricData?.target}</div>
          </div>
          <div>
            <div className="text-sm text-text-secondary mb-1">Gap</div>
            <div className={`font-semibold ${
              selectedMetricData?.value >= selectedMetricData?.target ? 'text-success' : 'text-error'
            }`}>
              {selectedMetricData?.value >= selectedMetricData?.target ? '+' : ''}
              {selectedMetricData?.value - selectedMetricData?.target}
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <Button
          variant="outline"
          fullWidth
          iconName="TrendingUp"
          iconPosition="left"
          iconSize={16}
          onClick={() => console.log('View trends')}
        >
          View Trends
        </Button>
        <Button
          variant="outline"
          fullWidth
          iconName="Download"
          iconPosition="left"
          iconSize={16}
          onClick={() => console.log('Export data')}
        >
          Export Data
        </Button>
      </div>
    </div>
  );
};

export default PerformanceOverview;