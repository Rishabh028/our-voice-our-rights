import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import ComparisonSelector from './components/ComparisonSelector';
import ComparisonResults from './components/ComparisonResults';
import RankingSystem from './components/RankingSystem';
import AdvancedFilters from './components/AdvancedFilters';
import ExportTools from './components/ExportTools';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ComparisonTool = () => {
  const [comparisonData, setComparisonData] = useState(null);
  const [activeView, setActiveView] = useState('comparison');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});

  const handleComparisonUpdate = (data) => {
    setComparisonData(data);
    setActiveView('comparison');
  };

  const handleFiltersApply = (filters) => {
    setAppliedFilters(filters);
    console.log('Applied filters:', filters);
  };

  const viewOptions = [
    { id: 'comparison', label: 'District Comparison', icon: 'GitCompare' },
    { id: 'rankings', label: 'Performance Rankings', icon: 'Trophy' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-4">
                <Icon name="GitCompare" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Performance Comparison Tool</h1>
                <p className="text-lg text-text-secondary mt-1">
                  Compare districts, analyze rankings, and discover insights for better governance
                </p>
              </div>
            </div>

            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-text-secondary">
              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="hover:text-primary transition-colors duration-200"
              >
                Dashboard
              </button>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground">Comparison Tool</span>
            </nav>
          </div>

          {/* View Toggle */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex space-x-1 bg-muted p-1 rounded-lg">
                {viewOptions?.map((view) => (
                  <button
                    key={view?.id}
                    onClick={() => setActiveView(view?.id)}
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeView === view?.id
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-text-secondary hover:text-foreground'
                    }`}
                  >
                    <Icon name={view?.icon} size={16} className="mr-2" />
                    {view?.label}
                  </button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-3">
                <AdvancedFilters
                  onFiltersApply={handleFiltersApply}
                  isOpen={filtersOpen}
                  onToggle={() => setFiltersOpen(!filtersOpen)}
                />
                
                <ExportTools
                  comparisonData={comparisonData}
                  isOpen={exportOpen}
                  onToggle={() => setExportOpen(!exportOpen)}
                />
                
                <Button
                  variant="outline"
                  iconName="HelpCircle"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => window.location.href = '/education-center'}
                >
                  Help
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {activeView === 'comparison' && (
              <>
                {/* Comparison Selector */}
                <ComparisonSelector
                  onComparisonUpdate={handleComparisonUpdate}
                  selectedDistricts={comparisonData}
                />

                {/* Comparison Results */}
                <ComparisonResults comparisonData={comparisonData} />

                {/* Quick Insights */}
                {comparisonData && (
                  <div className="bg-card rounded-xl border border-border p-6 shadow-civic-elevation">
                    <div className="flex items-center mb-4">
                      <Icon name="Lightbulb" size={20} className="text-secondary mr-3" />
                      <h3 className="text-lg font-semibold text-foreground">Quick Insights</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Icon name="TrendingUp" size={16} className="text-accent mr-2" />
                          <span className="text-sm font-medium text-foreground">Performance Gap</span>
                        </div>
                        <p className="text-xs text-text-secondary">
                          {comparisonData?.district1?.charAt(0)?.toUpperCase() + comparisonData?.district1?.slice(1)} leads by 15.2% in overall performance metrics
                        </p>
                      </div>
                      
                      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Icon name="Users" size={16} className="text-warning mr-2" />
                          <span className="text-sm font-medium text-foreground">Employment Focus</span>
                        </div>
                        <p className="text-xs text-text-secondary">
                          Both districts show strong women participation above national average
                        </p>
                      </div>
                      
                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Icon name="Target" size={16} className="text-primary mr-2" />
                          <span className="text-sm font-medium text-foreground">Improvement Area</span>
                        </div>
                        <p className="text-xs text-text-secondary">
                          Work completion rates need attention in both districts
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {activeView === 'rankings' && (
              <RankingSystem />
            )}
          </div>

          {/* Collaboration Features */}
          <div className="mt-12 bg-surface rounded-xl border border-border p-6">
            <div className="flex items-center mb-4">
              <Icon name="Users" size={20} className="text-primary mr-3" />
              <h3 className="text-lg font-semibold text-foreground">Collaborative Analysis</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Share2" size={20} className="text-accent" />
                </div>
                <h4 className="font-medium text-foreground mb-2">Share Analysis</h4>
                <p className="text-sm text-text-secondary">
                  Share your comparison reports with team members and stakeholders
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="MessageSquare" size={20} className="text-secondary" />
                </div>
                <h4 className="font-medium text-foreground mb-2">Add Comments</h4>
                <p className="text-sm text-text-secondary">
                  Collaborate with annotations and insights on specific data points
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Bell" size={20} className="text-primary" />
                </div>
                <h4 className="font-medium text-foreground mb-2">Get Alerts</h4>
                <p className="text-sm text-text-secondary">
                  Receive notifications when significant changes occur in compared districts
                </p>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <Button
                variant="outline"
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={16}
              >
                Learn More About Collaboration Features
              </Button>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center">
            <div className="bg-muted rounded-lg p-6">
              <Icon name="Database" size={24} className="text-primary mx-auto mb-3" />
              <h4 className="text-lg font-medium text-foreground mb-2">Data Transparency</h4>
              <p className="text-text-secondary mb-4">
                All comparison data is sourced from official government databases and updated daily. 
                Last updated: {new Date()?.toLocaleDateString('en-IN', { 
                  day: '2-digit', 
                  month: '2-digit', 
                  year: 'numeric' 
                })}
              </p>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/data-transparency'}
                iconName="ExternalLink"
                iconPosition="right"
                iconSize={14}
              >
                View Data Sources
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComparisonTool;