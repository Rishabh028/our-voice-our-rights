import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationAwareInsights = ({ userLocation }) => {
  const [nearbyDistricts, setNearbyDistricts] = useState([]);
  const [localInsights, setLocalInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userLocation) {
      // Simulate API call to fetch nearby districts and local insights
      const timer = setTimeout(() => {
        setNearbyDistricts([
          {
            name: 'Pune',
            state: 'Maharashtra',
            distance: 45,
            performance: 92.3,
            rank: 23,
            trend: 'up',
            jobsGenerated: 45600,
            budgetUtilized: 87.5
          },
          {
            name: 'Ahmednagar',
            state: 'Maharashtra',
            distance: 78,
            performance: 84.7,
            rank: 67,
            trend: 'up',
            jobsGenerated: 38200,
            budgetUtilized: 82.1
          },
          {
            name: 'Aurangabad',
            state: 'Maharashtra',
            distance: 112,
            performance: 79.2,
            rank: 89,
            trend: 'down',
            jobsGenerated: 41800,
            budgetUtilized: 76.3
          }
        ]);

        setLocalInsights({
          currentMonth: {
            jobsCreated: 12450,
            wagesPaid: 2.8,
            projectsCompleted: 156,
            beneficiaries: 8920
          },
          comparison: {
            vsLastMonth: {
              jobs: 15.2,
              wages: 8.7,
              projects: -2.1,
              beneficiaries: 12.4
            },
            vsStateAverage: {
              performance: 4.2,
              efficiency: -1.8,
              transparency: 6.5
            }
          },
          topProjects: [
            {
              name: 'Rural Road Construction - Phase 3',
              completion: 78,
              budget: 45.2,
              beneficiaries: 2340,
              status: 'On Track'
            },
            {
              name: 'Water Conservation - Watershed Development',
              completion: 92,
              budget: 32.8,
              beneficiaries: 1890,
              status: 'Ahead of Schedule'
            },
            {
              name: 'Plantation Drive - Community Forestry',
              completion: 45,
              budget: 18.5,
              beneficiaries: 1120,
              status: 'Delayed'
            }
          ]
        });

        setIsLoading(false);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [userLocation]);

  const getPerformanceColor = (score) => {
    if (score >= 85) return 'text-accent';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getPerformanceBg = (score) => {
    if (score >= 85) return 'bg-accent/10 border-accent/20';
    if (score >= 70) return 'bg-warning/10 border-warning/20';
    return 'bg-error/10 border-error/20';
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-accent' : 'text-error';
  };

  const getProjectStatusColor = (status) => {
    switch (status) {
      case 'On Track': return 'bg-accent/10 text-accent border-accent/20';
      case 'Ahead of Schedule': return 'bg-primary/10 text-primary border-primary/20';
      case 'Delayed': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-muted text-text-secondary border-border';
    }
  };

  if (!userLocation) {
    return (
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="MapPin" size={32} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Discover Local Insights
            </h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              Allow location access to see personalized data for your district and nearby areas.
            </p>
            <Button
              variant="default"
              iconName="MapPin"
              iconPosition="left"
              onClick={() => window.location?.reload()}
            >
              Enable Location Services
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="MapPin" size={16} className="mr-2" />
            {userLocation?.name}, {userLocation?.state}
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Your Local Performance Dashboard
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Personalized insights for your district including current performance metrics, 
            nearby comparisons, and local project updates.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-text-secondary">Loading your local data...</p>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Current District Performance */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Current Month Stats */}
              <div className="bg-card rounded-xl p-6 border border-border shadow-civic-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-foreground">
                    October 2025 Performance
                  </h3>
                  <div className={`
                    px-3 py-1 rounded-full text-sm font-medium border
                    ${getPerformanceBg(userLocation?.performance)}
                  `}>
                    Score: {userLocation?.performance}%
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-surface rounded-lg">
                    <Icon name="Briefcase" size={24} className="text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">
                      {localInsights?.currentMonth?.jobsCreated?.toLocaleString()}
                    </div>
                    <div className="text-sm text-text-secondary">Jobs Created</div>
                    <div className="text-xs text-accent mt-1">
                      +{localInsights?.comparison?.vsLastMonth?.jobs}% vs last month
                    </div>
                  </div>

                  <div className="text-center p-4 bg-surface rounded-lg">
                    <Icon name="IndianRupee" size={24} className="text-secondary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">
                      ₹{localInsights?.currentMonth?.wagesPaid}Cr
                    </div>
                    <div className="text-sm text-text-secondary">Wages Paid</div>
                    <div className="text-xs text-accent mt-1">
                      +{localInsights?.comparison?.vsLastMonth?.wages}% vs last month
                    </div>
                  </div>

                  <div className="text-center p-4 bg-surface rounded-lg">
                    <Icon name="Building" size={24} className="text-accent mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">
                      {localInsights?.currentMonth?.projectsCompleted}
                    </div>
                    <div className="text-sm text-text-secondary">Projects Done</div>
                    <div className="text-xs text-error mt-1">
                      {localInsights?.comparison?.vsLastMonth?.projects}% vs last month
                    </div>
                  </div>

                  <div className="text-center p-4 bg-surface rounded-lg">
                    <Icon name="Users" size={24} className="text-warning mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">
                      {localInsights?.currentMonth?.beneficiaries?.toLocaleString()}
                    </div>
                    <div className="text-sm text-text-secondary">Beneficiaries</div>
                    <div className="text-xs text-accent mt-1">
                      +{localInsights?.comparison?.vsLastMonth?.beneficiaries}% vs last month
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Local Projects */}
              <div className="bg-card rounded-xl p-6 border border-border shadow-civic-sm">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Active Projects in Your District
                </h3>
                
                <div className="space-y-4">
                  {localInsights?.topProjects?.map((project, index) => (
                    <div key={index} className="border border-border rounded-lg p-4 hover:bg-surface transition-colors duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-foreground flex-1 mr-4">
                          {project?.name}
                        </h4>
                        <div className={`
                          px-2 py-1 rounded-full text-xs font-medium border
                          ${getProjectStatusColor(project?.status)}
                        `}>
                          {project?.status}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-text-secondary">Progress</div>
                          <div className="font-medium text-foreground">{project?.completion}%</div>
                        </div>
                        <div>
                          <div className="text-text-secondary">Budget</div>
                          <div className="font-medium text-foreground">₹{project?.budget}L</div>
                        </div>
                        <div>
                          <div className="text-text-secondary">Beneficiaries</div>
                          <div className="font-medium text-foreground">{project?.beneficiaries}</div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project?.completion}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Nearby Districts Comparison */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-card rounded-xl p-6 border border-border shadow-civic-sm">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Nearby Districts
                </h3>
                
                <div className="space-y-4">
                  {nearbyDistricts?.map((district, index) => (
                    <div key={index} className="border border-border rounded-lg p-4 hover:bg-surface transition-colors duration-200 cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-foreground">{district?.name}</h4>
                          <p className="text-sm text-text-secondary">{district?.distance}km away</p>
                        </div>
                        <Icon 
                          name={getTrendIcon(district?.trend)} 
                          size={16} 
                          className={getTrendColor(district?.trend)}
                        />
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Performance</span>
                          <span className={`font-medium ${getPerformanceColor(district?.performance)}`}>
                            {district?.performance}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Rank</span>
                          <span className="font-medium text-foreground">#{district?.rank}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Jobs</span>
                          <span className="font-medium text-foreground">{district?.jobsGenerated?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  fullWidth
                  className="mt-6"
                  iconName="GitCompare"
                  iconPosition="left"
                  onClick={() => window.location.href = '/comparison-tool'}
                >
                  Compare All Districts
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="bg-card rounded-xl p-6 border border-border shadow-civic-sm">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                
                <div className="space-y-3">
                  <Button
                    variant="ghost"
                    fullWidth
                    iconName="FileText"
                    iconPosition="left"
                    onClick={() => window.location.href = '/dashboard'}
                  >
                    View Detailed Report
                  </Button>
                  
                  <Button
                    variant="ghost"
                    fullWidth
                    iconName="Download"
                    iconPosition="left"
                  >
                    Download District Data
                  </Button>
                  
                  <Button
                    variant="ghost"
                    fullWidth
                    iconName="Share2"
                    iconPosition="left"
                  >
                    Share Performance
                  </Button>
                  
                  <Button
                    variant="ghost"
                    fullWidth
                    iconName="Bell"
                    iconPosition="left"
                  >
                    Set Up Alerts
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LocationAwareInsights;