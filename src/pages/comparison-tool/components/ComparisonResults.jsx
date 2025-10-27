import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ComparisonResults = ({ comparisonData }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!comparisonData) {
    return (
      <div className="bg-card rounded-xl border border-border p-8 text-center">
        <Icon name="GitCompare" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No Comparison Selected</h3>
        <p className="text-text-secondary">Select two districts above to start comparing their performance metrics.</p>
      </div>
    );
  }

  const { district1, district2, comparisonType, timeframe } = comparisonData;

  // Mock comparison data
  const performanceData = [
    {
      metric: 'Job Cards Issued',
      district1: 85420,
      district2: 72350,
      unit: 'cards',
      district1Name: district1?.charAt(0)?.toUpperCase() + district1?.slice(1),
      district2Name: district2?.charAt(0)?.toUpperCase() + district2?.slice(1)
    },
    {
      metric: 'Employment Generated',
      district1: 2.8,
      district2: 2.3,
      unit: 'crore person-days',
      district1Name: district1?.charAt(0)?.toUpperCase() + district1?.slice(1),
      district2Name: district2?.charAt(0)?.toUpperCase() + district2?.slice(1)
    },
    {
      metric: 'Wages Distributed',
      district1: 542.7,
      district2: 398.2,
      unit: '₹ crores',
      district1Name: district1?.charAt(0)?.toUpperCase() + district1?.slice(1),
      district2Name: district2?.charAt(0)?.toUpperCase() + district2?.slice(1)
    },
    {
      metric: 'Work Completion Rate',
      district1: 78.5,
      district2: 82.1,
      unit: '%',
      district1Name: district1?.charAt(0)?.toUpperCase() + district1?.slice(1),
      district2Name: district2?.charAt(0)?.toUpperCase() + district2?.slice(1)
    },
    {
      metric: 'Average Wage per Day',
      district1: 285,
      district2: 298,
      unit: '₹',
      district1Name: district1?.charAt(0)?.toUpperCase() + district1?.slice(1),
      district2Name: district2?.charAt(0)?.toUpperCase() + district2?.slice(1)
    }
  ];

  const trendData = [
    { month: 'Apr 2024', district1: 75, district2: 68 },
    { month: 'May 2024', district1: 78, district2: 72 },
    { month: 'Jun 2024', district1: 82, district2: 75 },
    { month: 'Jul 2024', district1: 85, district2: 78 },
    { month: 'Aug 2024', district1: 88, district2: 82 },
    { month: 'Sep 2024', district1: 85, district2: 85 },
    { month: 'Oct 2024', district1: 87, district2: 88 }
  ];

  const categoryData = [
    { name: 'SC Beneficiaries', district1: 35, district2: 28, color: '#1e3a8a' },
    { name: 'ST Beneficiaries', district1: 22, district2: 18, color: '#f97316' },
    { name: 'Women Beneficiaries', district1: 48, district2: 52, color: '#16a34a' },
    { name: 'Others', district1: 45, district2: 42, color: '#dc2626' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'trends', label: 'Trends', icon: 'TrendingUp' },
    { id: 'demographics', label: 'Demographics', icon: 'Users' },
    { id: 'insights', label: 'Insights', icon: 'Lightbulb' }
  ];

  const getBetterPerformer = (value1, value2, higherIsBetter = true) => {
    if (higherIsBetter) {
      return value1 > value2 ? 'district1' : value2 > value1 ? 'district2' : 'tie';
    } else {
      return value1 < value2 ? 'district1' : value2 < value1 ? 'district2' : 'tie';
    }
  };

  const formatValue = (value, unit) => {
    if (unit === '₹ crores' || unit === 'crore person-days') {
      return `${value} ${unit}`;
    } else if (unit === '₹') {
      return `₹${value?.toLocaleString('en-IN')}`;
    } else if (unit === '%') {
      return `${value}%`;
    } else {
      return `${value?.toLocaleString('en-IN')} ${unit}`;
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-civic-elevation">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {district1?.charAt(0)?.toUpperCase() + district1?.slice(1)} vs {district2?.charAt(0)?.toUpperCase() + district2?.slice(1)}
            </h2>
            <p className="text-sm text-text-secondary">
              {comparisonType?.charAt(0)?.toUpperCase() + comparisonType?.slice(1)} comparison for {timeframe}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              iconSize={16}
            >
              Export Report
            </Button>
            <Button
              variant="outline"
              iconName="Share2"
              iconPosition="left"
              iconSize={16}
            >
              Share
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mt-6 bg-muted p-1 rounded-lg">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-text-secondary hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} className="mr-2" />
              {tab?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Performance Metrics */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Performance Comparison</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="metric" 
                      stroke="#6b7280"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      formatter={(value, name, props) => [
                        formatValue(value, props?.payload?.unit),
                        props?.payload?.[`${name}Name`]
                      ]}
                      labelStyle={{ color: '#1f2937' }}
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="district1" fill="#1e3a8a" name="district1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="district2" fill="#f97316" name="district2" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {performanceData?.slice(0, 3)?.map((metric, index) => {
                const better = getBetterPerformer(metric?.district1, metric?.district2);
                return (
                  <div key={index} className="bg-surface rounded-lg p-4 border border-border">
                    <h4 className="text-sm font-medium text-text-secondary mb-2">{metric?.metric}</h4>
                    <div className="space-y-2">
                      <div className={`flex justify-between items-center ${better === 'district1' ? 'text-accent' : 'text-foreground'}`}>
                        <span className="text-sm">{metric?.district1Name}</span>
                        <span className="font-semibold">{formatValue(metric?.district1, metric?.unit)}</span>
                        {better === 'district1' && <Icon name="TrendingUp" size={16} />}
                      </div>
                      <div className={`flex justify-between items-center ${better === 'district2' ? 'text-accent' : 'text-foreground'}`}>
                        <span className="text-sm">{metric?.district2Name}</span>
                        <span className="font-semibold">{formatValue(metric?.district2, metric?.unit)}</span>
                        {better === 'district2' && <Icon name="TrendingUp" size={16} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Performance Trends</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      labelStyle={{ color: '#1f2937' }}
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="district1" 
                      stroke="#1e3a8a" 
                      strokeWidth={3}
                      name={district1?.charAt(0)?.toUpperCase() + district1?.slice(1)}
                      dot={{ fill: '#1e3a8a', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="district2" 
                      stroke="#f97316" 
                      strokeWidth={3}
                      name={district2?.charAt(0)?.toUpperCase() + district2?.slice(1)}
                      dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'demographics' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Beneficiary Demographics</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[district1, district2]?.map((district, districtIndex) => (
                  <div key={district} className="bg-surface rounded-lg p-4">
                    <h4 className="text-md font-medium text-foreground mb-4 capitalize">{district}</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData?.map(cat => ({
                              name: cat?.name,
                              value: districtIndex === 0 ? cat?.district1 : cat?.district2,
                              color: cat?.color
                            }))}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {categoryData?.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry?.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${value}%`, 'Percentage']}
                            labelStyle={{ color: '#1f2937' }}
                            contentStyle={{ 
                              backgroundColor: '#ffffff', 
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Key Insights & Recommendations</h3>
              
              <div className="space-y-4">
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <div className="flex items-start">
                    <Icon name="TrendingUp" size={20} className="text-accent mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Performance Leader</h4>
                      <p className="text-sm text-text-secondary">
                        {district1?.charAt(0)?.toUpperCase() + district1?.slice(1)} shows stronger performance in employment generation with 2.8 crore person-days compared to {district2?.charAt(0)?.toUpperCase() + district2?.slice(1)}'s 2.3 crore person-days.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <div className="flex items-start">
                    <Icon name="AlertTriangle" size={20} className="text-warning mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Area for Improvement</h4>
                      <p className="text-sm text-text-secondary">
                        {district1?.charAt(0)?.toUpperCase() + district1?.slice(1)} has a lower work completion rate (78.5%) compared to {district2?.charAt(0)?.toUpperCase() + district2?.slice(1)} (82.1%). Focus on project management and monitoring could help improve this metric.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start">
                    <Icon name="Users" size={20} className="text-primary mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Demographic Insights</h4>
                      <p className="text-sm text-text-secondary">
                        {district2?.charAt(0)?.toUpperCase() + district2?.slice(1)} has better women participation (52%) compared to {district1?.charAt(0)?.toUpperCase() + district1?.slice(1)} (48%). This indicates more inclusive program implementation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                  <div className="flex items-start">
                    <Icon name="Target" size={20} className="text-secondary mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Recommendations</h4>
                      <ul className="text-sm text-text-secondary space-y-1">
                        <li>• Implement best practices from {district2?.charAt(0)?.toUpperCase() + district2?.slice(1)} for work completion rates</li>
                        <li>• Share {district1?.charAt(0)?.toUpperCase() + district1?.slice(1)}'s employment generation strategies</li>
                        <li>• Focus on improving wage distribution efficiency in both districts</li>
                        <li>• Enhance women participation programs in {district1?.charAt(0)?.toUpperCase() + district1?.slice(1)}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonResults;