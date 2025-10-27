import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpdateSchedule = () => {
  const scheduleData = [
    {
      id: 1,
      dataType: "MGNREGA Employment Data",
      source: "Ministry of Rural Development",
      frequency: "Daily",
      lastUpdate: "2025-10-25 06:00 AM",
      nextUpdate: "2025-10-26 06:00 AM",
      status: "active",
      reliability: 99.2,
      icon: "Users"
    },
    {
      id: 2,
      dataType: "Financial Disbursement Records",
      source: "National Electronic Fund Management System",
      frequency: "Real-time",
      lastUpdate: "2025-10-25 12:45 PM",
      nextUpdate: "Continuous",
      status: "active",
      reliability: 98.8,
      icon: "CreditCard"
    },
    {
      id: 3,
      dataType: "Work Completion Reports",
      source: "State Government Portals",
      frequency: "Weekly",
      lastUpdate: "2025-10-23 11:30 PM",
      nextUpdate: "2025-10-30 11:30 PM",
      status: "active",
      reliability: 96.5,
      icon: "CheckSquare"
    },
    {
      id: 4,
      dataType: "Beneficiary Registration Data",
      source: "Job Card Management System",
      frequency: "Daily",
      lastUpdate: "2025-10-25 05:15 AM",
      nextUpdate: "2025-10-26 05:15 AM",
      status: "maintenance",
      reliability: 97.8,
      icon: "UserCheck"
    },
    {
      id: 5,
      dataType: "Asset Creation Records",
      source: "Geo-MGNREGA Platform",
      frequency: "Bi-weekly",
      lastUpdate: "2025-10-20 08:00 AM",
      nextUpdate: "2025-11-03 08:00 AM",
      status: "active",
      reliability: 95.3,
      icon: "Building"
    },
    {
      id: 6,
      dataType: "Audit & Compliance Reports",
      source: "Social Audit Units",
      frequency: "Monthly",
      lastUpdate: "2025-10-01 02:00 PM",
      nextUpdate: "2025-11-01 02:00 PM",
      status: "delayed",
      reliability: 92.1,
      icon: "FileText"
    }
  ];

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
      case 'maintenance': return 'Settings';
      case 'delayed': return 'AlertTriangle';
      default: return 'HelpCircle';
    }
  };

  const getReliabilityColor = (reliability) => {
    if (reliability >= 98) return 'text-success';
    if (reliability >= 95) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="civic-card p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-3">Data Update Schedule</h2>
        <p className="text-text-secondary mb-6">
          Real-time tracking of data refresh cycles and system reliability across all government data sources.
        </p>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-surface rounded-lg p-4 text-center">
            <Icon name="Clock" size={24} className="text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">24/7</p>
            <p className="text-sm text-text-secondary">Monitoring</p>
          </div>
          <div className="bg-surface rounded-lg p-4 text-center">
            <Icon name="Database" size={24} className="text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">6</p>
            <p className="text-sm text-text-secondary">Data Sources</p>
          </div>
          <div className="bg-surface rounded-lg p-4 text-center">
            <Icon name="TrendingUp" size={24} className="text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">97.2%</p>
            <p className="text-sm text-text-secondary">Avg Reliability</p>
          </div>
          <div className="bg-surface rounded-lg p-4 text-center">
            <Icon name="RefreshCw" size={24} className="text-secondary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">5 min</p>
            <p className="text-sm text-text-secondary">Avg Delay</p>
          </div>
        </div>
      </div>
      {/* Schedule Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-2 text-foreground font-semibold">Data Source</th>
              <th className="text-left py-4 px-2 text-foreground font-semibold">Frequency</th>
              <th className="text-left py-4 px-2 text-foreground font-semibold">Last Update</th>
              <th className="text-left py-4 px-2 text-foreground font-semibold">Next Update</th>
              <th className="text-left py-4 px-2 text-foreground font-semibold">Status</th>
              <th className="text-left py-4 px-2 text-foreground font-semibold">Reliability</th>
              <th className="text-left py-4 px-2 text-foreground font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData?.map((item) => (
              <tr key={item?.id} className="border-b border-border/50 hover:bg-surface/50 transition-colors duration-200">
                <td className="py-4 px-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                      <Icon name={item?.icon} size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item?.dataType}</p>
                      <p className="text-sm text-text-secondary">{item?.source}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className="px-3 py-1 bg-muted rounded-full text-sm font-medium text-foreground">
                    {item?.frequency}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <p className="text-sm text-foreground">{item?.lastUpdate}</p>
                </td>
                <td className="py-4 px-2">
                  <p className="text-sm text-foreground">{item?.nextUpdate}</p>
                </td>
                <td className="py-4 px-2">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full ${getStatusColor(item?.status)}`}>
                    <Icon name={getStatusIcon(item?.status)} size={14} className="mr-1" />
                    <span className="text-sm font-medium capitalize">{item?.status}</span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${getReliabilityColor(item?.reliability)}`}>
                      {item?.reliability}%
                    </span>
                    <div className="w-16 h-2 bg-muted rounded-full ml-2">
                      <div 
                        className={`h-full rounded-full ${
                          item?.reliability >= 98 ? 'bg-success' : 
                          item?.reliability >= 95 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${item?.reliability}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="BarChart3"
                      iconSize={14}
                      className="p-2"
                      title="View Analytics"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Bell"
                      iconSize={14}
                      className="p-2"
                      title="Set Alert"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Update Notifications */}
      <div className="mt-8 bg-surface rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Update Notifications</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <Icon name="Bell" size={20} className="text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-foreground mb-1">Email Alerts</p>
              <p className="text-sm text-text-secondary">
                Get notified when critical data sources experience delays or maintenance
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Icon name="Smartphone" size={20} className="text-primary mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-foreground mb-1">SMS Updates</p>
              <p className="text-sm text-text-secondary">
                Receive SMS notifications for major system updates and data releases
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-6">
          <Button
            variant="default"
            iconName="Settings"
            iconPosition="left"
            iconSize={16}
          >
            Configure Alerts
          </Button>
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export Schedule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateSchedule;