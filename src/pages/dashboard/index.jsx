import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricsCard from './components/MetricsCard';
import PerformanceChart from './components/PerformanceChart';
import DistrictSelector from './components/DistrictSelector';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import PerformanceOverview from './components/PerformanceOverview';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for districts
  const districts = [
    { id: 1, name: "Pune", state: "Maharashtra", performance: 87, alt: "Pune district administrative building with modern architecture" },
    { id: 2, name: "Bangalore Urban", state: "Karnataka", performance: 92, alt: "Bangalore Urban district office with glass facade" },
    { id: 3, name: "Jaipur", state: "Rajasthan", performance: 78, alt: "Jaipur district collectorate with traditional Rajasthani architecture" },
    { id: 4, name: "Thiruvananthapuram", state: "Kerala", performance: 94, alt: "Thiruvananthapuram district headquarters surrounded by palm trees" },
    { id: 5, name: "Gurgaon", state: "Haryana", performance: 85, alt: "Gurgaon district office in modern commercial complex" },
    { id: 6, name: "Hyderabad", state: "Telangana", performance: 89, alt: "Hyderabad district administrative center with contemporary design" }
  ];

  // Mock metrics data
  const metricsData = [
    {
      title: "Active Job Cards",
      value: "2,45,678",
      change: "+12.5%",
      changeType: "positive",
      icon: "CreditCard",
      description: "Total active MGNREGA job cards",
      trend: [45, 52, 48, 61, 55, 67, 72, 68, 75, 82, 78, 85]
    },
    {
      title: "Employment Generated",
      value: "1,89,432",
      change: "+8.3%",
      changeType: "positive",
      icon: "Users",
      description: "Person-days of employment",
      trend: [38, 42, 45, 48, 52, 49, 55, 58, 62, 65, 68, 71]
    },
    {
      title: "Wage Payments",
      value: "₹45.2 Cr",
      change: "-2.1%",
      changeType: "negative",
      icon: "IndianRupee",
      description: "Total wages disbursed",
      trend: [65, 68, 62, 58, 55, 52, 48, 45, 42, 38, 35, 32]
    },
    {
      title: "Transparency Score",
      value: "8.4/10",
      change: "+0.3",
      changeType: "positive",
      icon: "Eye",
      description: "Data transparency index",
      trend: [72, 75, 78, 82, 85, 88, 84, 87, 89, 92, 88, 91]
    }
  ];

  // Mock chart data
  const performanceChartData = [
    { name: 'Jan', value: 78 },
    { name: 'Feb', value: 82 },
    { name: 'Mar', value: 85 },
    { name: 'Apr', value: 79 },
    { name: 'May', value: 88 },
    { name: 'Jun', value: 92 },
    { name: 'Jul', value: 87 },
    { name: 'Aug', value: 94 },
    { name: 'Sep', value: 89 },
    { name: 'Oct', value: 96 }
  ];

  const employmentChartData = [
    { name: 'Agriculture', value: 45 },
    { name: 'Rural Infrastructure', value: 28 },
    { name: 'Water Conservation', value: 15 },
    { name: 'Sanitation', value: 12 }
  ];

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'update',
      title: 'Monthly Performance Data Updated',
      description: 'October 2024 MGNREGA performance metrics have been refreshed with latest government data.',
      district: 'Pune, Maharashtra',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      priority: 'normal'
    },
    {
      id: 2,
      type: 'alert',
      title: 'Wage Payment Delay Alert',
      description: 'Wage payments in 3 districts are delayed beyond the mandated 15-day period.',
      district: 'Multiple Districts',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      priority: 'high'
    },
    {
      id: 3,
      type: 'success',
      title: 'Employment Target Achieved',
      description: 'Thiruvananthapuram district has successfully achieved 100% of its annual employment generation target.',
      district: 'Thiruvananthapuram, Kerala',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      priority: 'normal'
    },
    {
      id: 4,
      type: 'report',
      title: 'Quarterly Report Generated',
      description: 'Q3 2024 comprehensive performance report is now available for download.',
      district: 'All Districts',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      priority: 'normal'
    },
    {
      id: 5,
      type: 'comparison',
      title: 'District Comparison Completed',
      description: 'Performance comparison between Maharashtra and Karnataka districts has been updated.',
      district: 'Maharashtra vs Karnataka',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      priority: 'normal'
    }
  ];

  // Mock district performance data
  const districtPerformanceData = {
    overallScore: 87,
    employmentScore: 92,
    wageScore: 78,
    transparencyScore: 89
  };

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (districts?.length > 0) {
        setSelectedDistrict(districts?.[0]);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'generate-report': console.log('Generating comprehensive report...');
        break;
      case 'refresh-data':
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
        break;
      default:
        console.log(`Action: ${action}`);
    }
  };

  const handleViewAllActivities = () => {
    console.log('Opening full activity log...');
  };

  const handleViewPerformanceDetails = () => {
    window.location.href = '/district-analysis';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
            <div className="p-6">
              {/* Loading Skeleton */}
              <div className="animate-pulse">
                <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[1, 2, 3, 4]?.map((i) => (
                    <div key={i} className="h-32 bg-muted rounded-xl"></div>
                  ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="h-80 bg-muted rounded-xl"></div>
                  <div className="h-80 bg-muted rounded-xl"></div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          <div className="p-4 sm:p-6">
            {/* Dashboard Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    Dashboard Overview
                  </h1>
                  <p className="text-text-secondary">
                    Real-time MGNREGA performance insights and analytics
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
                  <DistrictSelector
                    selectedDistrict={selectedDistrict}
                    onDistrictChange={handleDistrictChange}
                    districts={districts}
                  />
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      iconName={refreshing ? "Loader2" : "RefreshCw"}
                      iconSize={16}
                      disabled={refreshing}
                      onClick={() => handleQuickAction('refresh-data')}
                      className={refreshing ? "animate-spin" : ""}
                    >
                      {refreshing ? 'Updating...' : 'Refresh'}
                    </Button>
                    
                    <Button
                      variant="default"
                      iconName="Download"
                      iconSize={16}
                      onClick={() => handleQuickAction('generate-report')}
                    >
                      Export
                    </Button>
                  </div>
                </div>
              </div>

              {/* District Info Banner */}
              {selectedDistrict && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 border border-primary/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Icon name="MapPin" size={20} className="text-primary mr-3" />
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {selectedDistrict?.name}, {selectedDistrict?.state}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          Performance Score: {selectedDistrict?.performance}%
                        </p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedDistrict?.performance >= 90 ? 'bg-success/20 text-success' :
                      selectedDistrict?.performance >= 70 ? 'bg-warning/20 text-warning': 'bg-error/20 text-error'
                    }`}>
                      {selectedDistrict?.performance >= 90 ? 'Excellent' :
                       selectedDistrict?.performance >= 70 ? 'Good' : 'Needs Improvement'}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Metrics Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
            >
              {metricsData?.map((metric, index) => (
                <motion.div
                  key={metric?.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  <MetricsCard {...metric} />
                </motion.div>
              ))}
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Performance Charts */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-2 space-y-6"
              >
                <PerformanceChart
                  title="Monthly Performance Trends"
                  data={performanceChartData}
                  type="line"
                  height={350}
                />
                
                <PerformanceChart
                  title="Employment by Category"
                  data={employmentChartData}
                  type="pie"
                  height={300}
                />
              </motion.div>

              {/* Sidebar Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-6"
              >
                <PerformanceOverview
                  districtData={districtPerformanceData}
                  onViewDetails={handleViewPerformanceDetails}
                />
                
                <QuickActions onActionClick={handleQuickAction} />
              </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <RecentActivity
                activities={recentActivities}
                onViewAll={handleViewAllActivities}
              />
            </motion.div>

            {/* Footer Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 p-4 bg-muted/50 rounded-lg"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-text-secondary">
                <div className="flex items-center mb-2 sm:mb-0">
                  <Icon name="Database" size={16} className="mr-2" />
                  <span>Data sourced from data.gov.in | Last updated: October 25, 2024</span>
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => window.location.href = '/data-transparency'}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    Data Transparency
                  </button>
                  <button 
                    onClick={() => window.location.href = '/help'}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    Help & Support
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;