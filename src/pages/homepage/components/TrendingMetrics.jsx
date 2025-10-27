import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendingMetrics = ({ userLocation }) => {
  const [activeTab, setActiveTab] = useState('performance');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Mock data for different metrics
  const performanceData = [
    { month: 'Oct', score: 78, target: 85 },
    { month: 'Nov', score: 82, target: 85 },
    { month: 'Dec', score: 85, target: 85 },
    { month: 'Jan', score: 88, target: 85 },
    { month: 'Feb', score: 87, target: 85 },
    { month: 'Mar', score: 91, target: 85 }
  ];

  const employmentData = [
    { district: 'Kerala', jobs: 2.4, color: '#16a34a' },
    { district: 'Tamil Nadu', jobs: 2.1, color: '#f97316' },
    { district: 'Rajasthan', jobs: 1.9, color: '#1e3a8a' },
    { district: 'Maharashtra', jobs: 1.7, color: '#dc2626' },
    { district: 'Others', jobs: 8.9, color: '#6b7280' }
  ];

  const budgetUtilization = [
    { category: 'Wages', amount: 65, color: '#16a34a' },
    { category: 'Materials', amount: 25, color: '#f97316' },
    { category: 'Admin', amount: 10, color: '#1e3a8a' }
  ];

  const trendingInsights = [
    {
      title: 'Employment Generation Surge',
      description: 'MGNREGA job creation increased by 23% this quarter across rural districts',
      trend: '+23%',
      icon: 'TrendingUp',
      color: 'accent',
      timeframe: 'This Quarter'
    },
    {
      title: 'Digital Payment Success',
      description: '94% of wage payments now processed digitally, reducing delays significantly',
      trend: '94%',
      icon: 'Smartphone',
      color: 'primary',
      timeframe: 'Current Month'
    },
    {
      title: 'Women Participation Growth',
      description: 'Female workforce participation reached 58%, highest in program history',
      trend: '+15%',
      icon: 'Users',
      color: 'secondary',
      timeframe: 'Year-over-Year'
    },
    {
      title: 'Transparency Score Improvement',
      description: 'Data availability and accuracy improved across 89% of districts',
      trend: '+12%',
      icon: 'Shield',
      color: 'warning',
      timeframe: 'Last 6 Months'
    }
  ];

  const tabs = [
    { id: 'performance', label: 'Performance Trends', icon: 'BarChart3' },
    { id: 'employment', label: 'Employment Data', icon: 'Users' },
    { id: 'budget', label: 'Budget Utilization', icon: 'PieChart' },
    { id: 'insights', label: 'Key Insights', icon: 'Lightbulb' }
  ];

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading latest data...</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'performance':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">District Performance Trends</h3>
              <div className="flex items-center text-sm text-text-secondary">
                <Icon name="Clock" size={16} className="mr-1" />
                Last 6 months
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#1e3a8a" 
                    strokeWidth={3}
                    dot={{ fill: '#1e3a8a', strokeWidth: 2, r: 4 }}
                    name="Performance Score"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Target"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'employment':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Employment Generation by State</h3>
              <div className="flex items-center text-sm text-text-secondary">
                <Icon name="Users" size={16} className="mr-1" />
                Million person-days
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={employmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="district" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                  <Bar dataKey="jobs" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'budget':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Budget Utilization Breakdown</h3>
              <div className="flex items-center text-sm text-text-secondary">
                <Icon name="IndianRupee" size={16} className="mr-1" />
                Percentage allocation
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetUtilization}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="amount"
                    >
                      {budgetUtilization?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {budgetUtilization?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: item?.color }}
                      ></div>
                      <span className="font-medium text-foreground">{item?.category}</span>
                    </div>
                    <span className="text-lg font-bold" style={{ color: item?.color }}>
                      {item?.amount}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'insights':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trendingInsights?.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-surface p-6 rounded-xl border border-border hover:shadow-civic-md transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center
                    ${insight?.color === 'accent' ? 'bg-accent/10 text-accent' : ''}
                    ${insight?.color === 'primary' ? 'bg-primary/10 text-primary' : ''}
                    ${insight?.color === 'secondary' ? 'bg-secondary/10 text-secondary' : ''}
                    ${insight?.color === 'warning' ? 'bg-warning/10 text-warning' : ''}
                  `}>
                    <Icon name={insight?.icon} size={24} />
                  </div>
                  <div className={`
                    px-3 py-1 rounded-full text-sm font-bold
                    ${insight?.color === 'accent' ? 'bg-accent/10 text-accent' : ''}
                    ${insight?.color === 'primary' ? 'bg-primary/10 text-primary' : ''}
                    ${insight?.color === 'secondary' ? 'bg-secondary/10 text-secondary' : ''}
                    ${insight?.color === 'warning' ? 'bg-warning/10 text-warning' : ''}
                  `}>
                    {insight?.trend}
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {insight?.title}
                </h4>
                
                <p className="text-text-secondary text-sm mb-3 leading-relaxed">
                  {insight?.description}
                </p>
                
                <div className="flex items-center text-xs text-text-secondary">
                  <Icon name="Calendar" size={12} className="mr-1" />
                  {insight?.timeframe}
                </div>
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Trending Performance Metrics
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Real-time insights and data trends from across India's MGNREGA implementation. 
            Stay informed about the latest developments and performance indicators.
          </p>
        </motion.div>

        {/* Metrics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-card rounded-2xl shadow-civic-lg border border-border overflow-hidden"
        >
          {/* Tab Navigation */}
          <div className="border-b border-border bg-surface">
            <div className="flex flex-wrap">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                    flex items-center px-6 py-4 text-sm font-medium transition-all duration-200
                    ${activeTab === tab?.id 
                      ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  <Icon name={tab?.icon} size={16} className="mr-2" />
                  {tab?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {renderTabContent()}
          </div>
        </motion.div>

        {/* Bottom Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              onClick={() => window.location.href = '/dashboard'}
              iconName="BarChart3"
              iconPosition="left"
            >
              View Full Dashboard
            </Button>
            
            <Button
              variant="outline"
              onClick={() => window.location.href = '/data-transparency'}
              iconName="Download"
              iconPosition="left"
            >
              Download Reports
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingMetrics;