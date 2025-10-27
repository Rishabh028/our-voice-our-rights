import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DistrictSelector from './components/DistrictSelector';
import PerformanceMetrics from './components/PerformanceMetrics';
import HistoricalTrends from './components/HistoricalTrends';
import ComparisonMatrix from './components/ComparisonMatrix';
import InteractiveMap from './components/InteractiveMap';
import DataTransparency from './components/DataTransparency';

const DistrictAnalysis = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const location = useLocation();

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);

    // Set default district if none selected
    if (!selectedDistrict) {
      setSelectedDistrict({
        id: 'agra',
        name: 'Agra',
        state: 'Uttar Pradesh',
        population: '44,18,797',
        area: '4,027 km²',
        performance: 'Good',
        rank: 15
      });
    }
  }, [selectedDistrict]);

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
  };

  const handleComparisonToggle = () => {
    setShowComparison(!showComparison);
  };

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  const breadcrumbItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'Home' },
    { name: 'District Analysis', path: '/district-analysis', icon: 'MapPin' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          <div className="p-6 space-y-6">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center space-x-2 text-sm">
              {breadcrumbItems?.map((item, index) => (
                <React.Fragment key={item?.path}>
                  <button
                    onClick={() => window.location.href = item?.path}
                    className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    <Icon name={item?.icon} size={14} />
                    <span>{item?.name}</span>
                  </button>
                  {index < breadcrumbItems?.length - 1 && (
                    <Icon name="ChevronRight" size={14} className="text-text-secondary" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-foreground">District Analysis</h1>
                <p className="text-text-secondary mt-2">
                  Comprehensive performance analysis with neighboring comparisons and historical context
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Language Toggle */}
                <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
                  <Button
                    variant={currentLanguage === 'en' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleLanguageChange('en')}
                    className="px-3 py-1"
                  >
                    EN
                  </Button>
                  <Button
                    variant={currentLanguage === 'hi' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleLanguageChange('hi')}
                    className="px-3 py-1"
                  >
                    हिं
                  </Button>
                </div>

                <Button
                  variant="outline"
                  iconName="Bell"
                  iconPosition="left"
                  iconSize={16}
                >
                  Set Alerts
                </Button>
                
                <Button
                  variant="default"
                  iconName="Download"
                  iconPosition="left"
                  iconSize={16}
                >
                  Export Report
                </Button>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Current District</p>
                    <p className="text-lg font-semibold text-foreground">
                      {selectedDistrict?.name || 'Select District'}
                    </p>
                  </div>
                  <Icon name="MapPin" size={24} className="text-primary" />
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">State Rank</p>
                    <p className="text-lg font-semibold text-foreground">
                      #{selectedDistrict?.rank || '--'}
                    </p>
                  </div>
                  <Icon name="Trophy" size={24} className="text-orange-500" />
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Performance</p>
                    <p className="text-lg font-semibold text-foreground">
                      {selectedDistrict?.performance || 'N/A'}
                    </p>
                  </div>
                  <Icon name="TrendingUp" size={24} className="text-green-500" />
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Last Updated</p>
                    <p className="text-lg font-semibold text-foreground">25/10/2025</p>
                  </div>
                  <Icon name="Clock" size={24} className="text-blue-500" />
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column - District Selection */}
              <div className="xl:col-span-1">
                <DistrictSelector
                  selectedDistrict={selectedDistrict}
                  onDistrictChange={handleDistrictChange}
                  onCompareToggle={handleComparisonToggle}
                />
              </div>

              {/* Right Column - Performance Metrics */}
              <div className="xl:col-span-2">
                <PerformanceMetrics district={selectedDistrict} />
              </div>
            </div>

            {/* Historical Trends */}
            <HistoricalTrends district={selectedDistrict} />

            {/* Interactive Map */}
            <InteractiveMap 
              selectedDistrict={selectedDistrict}
              onDistrictSelect={handleDistrictChange}
            />

            {/* Data Transparency */}
            <DataTransparency />

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Icon name="GitCompare" size={20} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-blue-800">Compare Districts</h3>
                </div>
                <p className="text-sm text-blue-700 mb-4">
                  Analyze performance across multiple districts with detailed comparison matrices
                </p>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={16}
                  onClick={handleComparisonToggle}
                  className="border-blue-300 text-blue-700 hover:bg-blue-200"
                >
                  Start Comparison
                </Button>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <Icon name="BookOpen" size={20} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-green-800">Education Center</h3>
                </div>
                <p className="text-sm text-green-700 mb-4">
                  Learn about MGNREGA rights, processes, and program benefits
                </p>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={16}
                  onClick={() => window.location.href = '/education-center'}
                  className="border-green-300 text-green-700 hover:bg-green-200"
                >
                  Explore Resources
                </Button>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <Icon name="Database" size={20} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-orange-800">Data Transparency</h3>
                </div>
                <p className="text-sm text-orange-700 mb-4">
                  Access open data, methodology, and verification processes
                </p>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={16}
                  onClick={() => window.location.href = '/data-transparency'}
                  className="border-orange-300 text-orange-700 hover:bg-orange-200"
                >
                  View Details
                </Button>
              </div>
            </div>

            {/* Footer Information */}
            <div className="bg-muted p-6 rounded-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Need Help?</h4>
                  <p className="text-sm text-text-secondary">
                    Contact our support team for assistance with district analysis or data interpretation
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    iconName="HelpCircle"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Help Center
                  </Button>
                  <Button
                    variant="outline"
                    iconName="MessageCircle"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Comparison Matrix Modal */}
      <ComparisonMatrix
        selectedDistrict={selectedDistrict}
        isVisible={showComparison}
        onClose={() => setShowComparison(false)}
      />
    </div>
  );
};

export default DistrictAnalysis;