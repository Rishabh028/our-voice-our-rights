import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataTransparency = () => {
  const [activeTab, setActiveTab] = useState('sources');

  const dataSources = [
    {
      id: 'mgnrega-mis',
      name: 'MGNREGA MIS Portal',
      url: 'https://nrega.nic.in/',
      lastUpdated: '25/10/2025 09:30 AM',
      status: 'Active',
      reliability: 99.2,
      description: 'Official MGNREGA Management Information System providing real-time employment data'
    },
    {
      id: 'data-gov',
      name: 'Data.gov.in',
      url: 'https://data.gov.in/',
      lastUpdated: '24/10/2025 11:45 PM',
      status: 'Active',
      reliability: 98.7,
      description: 'Government of India open data platform for public datasets'
    },
    {
      id: 'census-data',
      name: 'Census of India',
      url: 'https://censusindia.gov.in/',
      lastUpdated: '20/10/2025 02:15 PM',
      status: 'Active',
      reliability: 99.8,
      description: 'Official demographic and socio-economic data from Census operations'
    },
    {
      id: 'state-portal',
      name: 'State Government Portal',
      url: 'https://up.gov.in/',
      lastUpdated: '25/10/2025 08:00 AM',
      status: 'Active',
      reliability: 97.5,
      description: 'State-specific employment and development program data'
    }
  ];

  const updateLogs = [
    {
      id: 1,
      timestamp: '25/10/2025 09:30 AM',
      source: 'MGNREGA MIS Portal',
      type: 'Data Sync',
      description: 'Updated employment days and wage payment data for October 2025',
      status: 'Success',
      recordsUpdated: '2,45,678'
    },
    {
      id: 2,
      timestamp: '24/10/2025 11:45 PM',
      source: 'Data.gov.in',
      type: 'Scheduled Update',
      description: 'Daily synchronization of job card issuance data',
      status: 'Success',
      recordsUpdated: '1,23,456'
    },
    {
      id: 3,
      timestamp: '24/10/2025 06:15 PM',
      source: 'State Government Portal',
      type: 'Manual Update',
      description: 'Corrected work completion data for September 2025',
      status: 'Success',
      recordsUpdated: '987'
    },
    {
      id: 4,
      timestamp: '23/10/2025 02:30 PM',
      source: 'MGNREGA MIS Portal',
      type: 'Data Validation',
      description: 'Verified transparency scores and audit reports',
      status: 'Warning',
      recordsUpdated: '45,234'
    },
    {
      id: 5,
      timestamp: '22/10/2025 10:00 AM',
      source: 'Census of India',
      type: 'Reference Update',
      description: 'Updated demographic baseline data for district analysis',
      status: 'Success',
      recordsUpdated: '78,901'
    }
  ];

  const methodology = [
    {
      step: 1,
      title: 'Data Collection',
      description: 'Automated daily collection from official government APIs and verified data sources',
      details: [
        'Real-time API integration with MGNREGA MIS',
        'Scheduled data pulls every 6 hours',
        'Validation against multiple source points',
        'Error handling and retry mechanisms'
      ]
    },
    {
      step: 2,
      title: 'Data Validation',
      description: 'Multi-layer validation process to ensure data accuracy and consistency',
      details: [
        'Cross-reference validation between sources',
        'Statistical anomaly detection',
        'Historical trend analysis',
        'Manual verification for critical metrics'
      ]
    },
    {
      step: 3,
      title: 'Processing & Analysis',
      description: 'Advanced analytics and performance scoring based on standardized metrics',
      details: [
        'Weighted scoring algorithms',
        'Comparative analysis frameworks',
        'Trend calculation and forecasting',
        'Performance benchmarking'
      ]
    },
    {
      step: 4,
      title: 'Quality Assurance',
      description: 'Continuous monitoring and quality checks before data publication',
      details: [
        'Automated quality score calculation',
        'Data freshness monitoring',
        'Accuracy verification protocols',
        'User feedback integration'
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-50';
      case 'Success': return 'text-green-600 bg-green-50';
      case 'Warning': return 'text-yellow-600 bg-yellow-50';
      case 'Error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getReliabilityColor = (reliability) => {
    if (reliability >= 99) return 'text-green-600';
    if (reliability >= 95) return 'text-blue-600';
    if (reliability >= 90) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-civic-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Data Transparency & Verification</h2>
          <p className="text-sm text-text-secondary mt-1">
            Complete transparency in data sources, methodology, and update processes
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            iconName="Shield"
            iconPosition="left"
            iconSize={16}
          >
            Verify Data
          </Button>
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Download Report
          </Button>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-6">
        <Button
          variant={activeTab === 'sources' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('sources')}
          iconName="Database"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          Data Sources
        </Button>
        <Button
          variant={activeTab === 'updates' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('updates')}
          iconName="Clock"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          Update Logs
        </Button>
        <Button
          variant={activeTab === 'methodology' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('methodology')}
          iconName="Settings"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          Methodology
        </Button>
      </div>
      {/* Data Sources Tab */}
      {activeTab === 'sources' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataSources?.map((source) => (
              <div key={source?.id} className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{source?.name}</h3>
                    <p className="text-sm text-text-secondary mt-1">{source?.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(source?.status)}`}>
                    {source?.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Last Updated:</span>
                    <span className="font-medium text-foreground">{source?.lastUpdated}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Reliability:</span>
                    <span className={`font-medium ${getReliabilityColor(source?.reliability)}`}>
                      {source?.reliability}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Source URL:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="ExternalLink"
                      iconSize={14}
                      className="p-1"
                    />
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        source?.reliability >= 99 ? 'bg-green-500' :
                        source?.reliability >= 95 ? 'bg-blue-500' :
                        source?.reliability >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${source?.reliability}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800">Data Verification Process</h4>
                <p className="text-sm text-blue-700 mt-1">
                  All data sources are continuously monitored for accuracy and reliability. We maintain a 99.5% uptime 
                  and cross-validate information across multiple official sources to ensure data integrity.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Update Logs Tab */}
      {activeTab === 'updates' && (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full border border-border rounded-lg">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-4 font-medium text-foreground border-b border-border">Timestamp</th>
                  <th className="text-left p-4 font-medium text-foreground border-b border-border">Source</th>
                  <th className="text-left p-4 font-medium text-foreground border-b border-border">Type</th>
                  <th className="text-left p-4 font-medium text-foreground border-b border-border">Description</th>
                  <th className="text-center p-4 font-medium text-foreground border-b border-border">Status</th>
                  <th className="text-right p-4 font-medium text-foreground border-b border-border">Records</th>
                </tr>
              </thead>
              <tbody>
                {updateLogs?.map((log) => (
                  <tr key={log?.id} className="hover:bg-muted/50">
                    <td className="p-4 border-b border-border">
                      <div className="text-sm font-medium text-foreground">{log?.timestamp}</div>
                    </td>
                    <td className="p-4 border-b border-border">
                      <div className="text-sm text-foreground">{log?.source}</div>
                    </td>
                    <td className="p-4 border-b border-border">
                      <div className="text-sm text-foreground">{log?.type}</div>
                    </td>
                    <td className="p-4 border-b border-border">
                      <div className="text-sm text-text-secondary">{log?.description}</div>
                    </td>
                    <td className="p-4 text-center border-b border-border">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log?.status)}`}>
                        {log?.status}
                      </span>
                    </td>
                    <td className="p-4 text-right border-b border-border">
                      <div className="text-sm font-medium text-foreground">{log?.recordsUpdated}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-text-secondary">
              Showing latest 5 updates. Last sync: 25/10/2025 09:30 AM
            </div>
            <Button variant="outline" size="sm">
              View All Logs
            </Button>
          </div>
        </div>
      )}
      {/* Methodology Tab */}
      {activeTab === 'methodology' && (
        <div className="space-y-6">
          {methodology?.map((step) => (
            <div key={step?.step} className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium text-sm">
                  {step?.step}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-2">{step?.title}</h3>
                <p className="text-sm text-text-secondary mb-3">{step?.description}</p>
                <ul className="space-y-1">
                  {step?.details?.map((detail, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="Check" size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-800">Quality Assurance</h4>
                <p className="text-sm text-green-700 mt-1">
                  Our methodology follows international standards for government data transparency and has been 
                  audited by independent third parties to ensure accuracy and reliability.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTransparency;