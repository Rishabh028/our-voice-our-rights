import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DataSourceCard from './components/DataSourceCard';
import MethodologySection from './components/MethodologySection';
import APIDocumentation from './components/APIDocumentation';
import UpdateSchedule from './components/UpdateSchedule';
import SecurityCompliance from './components/SecurityCompliance';

const DataTransparency = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const dataSources = [
    {
      id: 1,
      name: "MGNREGA Management System",
      department: "Ministry of Rural Development",
      description: "Comprehensive employment data including job cards, work allocation, and wage payments across all districts.",
      icon: "Users",
      status: "active",
      updateFrequency: "Daily",
      lastUpdated: "2025-10-25 06:00 AM",
      dataPoints: "2.5M+ records",
      accuracy: 98.5,
      apiUrl: "https://api.ourvoiceourrights.gov.in/mgnrega"
    },
    {
      id: 2,
      name: "Financial Management System",
      department: "National Electronic Fund Management",
      description: "Real-time financial data including fund allocation, disbursement tracking, and expenditure analysis.",
      icon: "CreditCard",
      status: "active",
      updateFrequency: "Real-time",
      lastUpdated: "2025-10-25 12:45 PM",
      dataPoints: "850K+ transactions",
      accuracy: 99.2,
      apiUrl: "https://api.ourvoiceourrights.gov.in/finance"
    },
    {
      id: 3,
      name: "Asset Creation Database",
      department: "Geo-MGNREGA Platform",
      description: "Geospatial data on infrastructure projects, asset creation, and community development works.",
      icon: "Building",
      status: "active",
      updateFrequency: "Weekly",
      lastUpdated: "2025-10-23 11:30 PM",
      dataPoints: "125K+ assets",
      accuracy: 96.8,
      apiUrl: "https://api.ourvoiceourrights.gov.in/assets"
    },
    {
      id: 4,
      name: "Social Audit Repository",
      department: "State Social Audit Units",
      description: "Community feedback, audit reports, and transparency measures from grassroots social audit processes.",
      icon: "FileText",
      status: "maintenance",
      updateFrequency: "Monthly",
      lastUpdated: "2025-10-01 02:00 PM",
      dataPoints: "45K+ reports",
      accuracy: 94.3,
      apiUrl: "https://api.ourvoiceourrights.gov.in/audit"
    },
    {
      id: 5,
      name: "Performance Analytics Engine",
      department: "Data Analytics Division",
      description: "Processed performance metrics, rankings, and comparative analysis across districts and states.",
      icon: "BarChart3",
      status: "active",
      updateFrequency: "Daily",
      lastUpdated: "2025-10-25 08:15 AM",
      dataPoints: "750+ districts",
      accuracy: 97.6,
      apiUrl: "https://api.ourvoiceourrights.gov.in/analytics"
    },
    {
      id: 6,
      name: "Beneficiary Registration System",
      department: "Job Card Management Portal",
      description: "Citizen registration data, job card information, and beneficiary demographic details.",
      icon: "UserCheck",
      status: "delayed",
      updateFrequency: "Daily",
      lastUpdated: "2025-10-24 05:15 AM",
      dataPoints: "12M+ beneficiaries",
      accuracy: 95.7,
      apiUrl: "https://api.ourvoiceourrights.gov.in/beneficiaries"
    }
  ];

  const navigationSections = [
    { id: 'overview', label: 'Overview', icon: 'Home' },
    { id: 'sources', label: 'Data Sources', icon: 'Database' },
    { id: 'methodology', label: 'Methodology', icon: 'Settings' },
    { id: 'api', label: 'API Documentation', icon: 'Code' },
    { id: 'schedule', label: 'Update Schedule', icon: 'Clock' },
    { id: 'security', label: 'Security & Compliance', icon: 'Shield' }
  ];

  const trustMetrics = [
    {
      id: 1,
      title: "Data Accuracy",
      value: "97.2%",
      description: "Average accuracy across all data sources",
      icon: "Target",
      color: "text-success"
    },
    {
      id: 2,
      title: "System Uptime",
      value: "99.8%",
      description: "Platform availability in the last 30 days",
      icon: "Activity",
      color: "text-primary"
    },
    {
      id: 3,
      title: "Update Frequency",
      value: "24/7",
      description: "Continuous monitoring and data refresh",
      icon: "RefreshCw",
      color: "text-accent"
    },
    {
      id: 4,
      title: "API Requests",
      value: "2.5M+",
      description: "Monthly API calls from developers",
      icon: "Zap",
      color: "text-secondary"
    }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Data Transparency Portal - Our Voice Our Rights</title>
        <meta name="description" content="Comprehensive transparency portal providing methodology, data sources, API documentation, and security compliance for civic data platform." />
        <meta name="keywords" content="data transparency, government data, API documentation, civic tech, MGNREGA data, open data" />
      </Helmet>
      <Header />
      <div className="w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
                  <Icon name="Database" size={40} className="text-primary-foreground" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Data Transparency Portal
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
                Complete transparency in government data processing, methodology, and access. 
                Building trust through open, verifiable, and accessible civic information.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Download"
                  iconPosition="left"
                  iconSize={20}
                  onClick={() => scrollToSection('api')}
                >
                  Access API
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="FileText"
                  iconPosition="left"
                  iconSize={20}
                  onClick={() => scrollToSection('methodology')}
                >
                  View Methodology
                </Button>
              </div>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustMetrics?.map((metric) => (
                <div key={metric?.id} className="civic-card p-6 text-center hover:shadow-civic-elevation transition-all duration-300">
                  <Icon name={metric?.icon} size={32} className={`mx-auto mb-3 ${metric?.color}`} />
                  <p className="text-2xl font-bold text-foreground mb-1">{metric?.value}</p>
                  <p className="text-sm text-text-secondary">{metric?.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="sticky top-16 z-40 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto py-4 space-x-2">
              {navigationSections?.map((section) => (
                <Button
                  key={section?.id}
                  variant={activeSection === section?.id ? "default" : "ghost"}
                  size="sm"
                  iconName={section?.icon}
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => scrollToSection(section?.id)}
                  className="flex-shrink-0"
                >
                  {section?.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Overview Section */}
          <section id="overview" className="mb-16">
            <div className="civic-card p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">Transparency Overview</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Our Commitment</h3>
                  <p className="text-text-secondary mb-6">
                    We believe that transparency is the foundation of democratic governance. Our platform provides 
                    unprecedented access to government data, ensuring every citizen can understand how public programs 
                    are performing and how their tax money is being utilized.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Icon name="CheckCircle" size={20} className="text-success mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Open Data Access</p>
                        <p className="text-sm text-text-secondary">Free, unrestricted access to all public datasets</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Icon name="CheckCircle" size={20} className="text-success mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Real-time Updates</p>
                        <p className="text-sm text-text-secondary">Continuous data synchronization with source systems</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Icon name="CheckCircle" size={20} className="text-success mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Audit Trails</p>
                        <p className="text-sm text-text-secondary">Complete transparency in data processing and changes</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Data Governance</h3>
                  <p className="text-text-secondary mb-6">
                    Our data governance framework ensures accuracy, reliability, and ethical use of public information 
                    while maintaining the highest standards of privacy and security.
                  </p>
                  <div className="bg-surface rounded-lg p-6">
                    <h4 className="font-semibold text-foreground mb-3">Key Principles</h4>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>• Accuracy through automated validation</li>
                      <li>• Timeliness with regular update cycles</li>
                      <li>• Accessibility for all user types</li>
                      <li>• Privacy protection for sensitive data</li>
                      <li>• Accountability through audit logging</li>
                      <li>• Interoperability with standard formats</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Data Sources Section */}
          <section id="sources" className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Data Sources</h2>
              <p className="text-text-secondary">
                Our platform integrates data from multiple official government sources, ensuring comprehensive 
                coverage of MGNREGA and related civic programs.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataSources?.map((source) => (
                <DataSourceCard key={source?.id} source={source} />
              ))}
            </div>
          </section>

          {/* Methodology Section */}
          <section id="methodology" className="mb-16">
            <MethodologySection />
          </section>

          {/* API Documentation Section */}
          <section id="api" className="mb-16">
            <APIDocumentation />
          </section>

          {/* Update Schedule Section */}
          <section id="schedule" className="mb-16">
            <UpdateSchedule />
          </section>

          {/* Security & Compliance Section */}
          <section id="security" className="mb-16">
            <SecurityCompliance />
          </section>

          {/* Contact & Support */}
          <section className="civic-card p-8 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="text-center">
              <Icon name="MessageSquare" size={48} className="text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Need Help or Have Questions?</h2>
              <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                Our technical team is here to support developers, researchers, and civic organizations. 
                Get help with API integration, data interpretation, or technical issues.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant="default"
                  iconName="Mail"
                  iconPosition="left"
                  iconSize={16}
                >
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  iconName="Book"
                  iconPosition="left"
                  iconSize={16}
                >
                  Documentation
                </Button>
                <Button
                  variant="outline"
                  iconName="Users"
                  iconPosition="left"
                  iconSize={16}
                >
                  Developer Community
                </Button>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-surface border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                    <Icon name="Database" size={16} className="text-primary-foreground" />
                  </div>
                  <span className="font-semibold text-foreground">Data Transparency</span>
                </div>
                <p className="text-sm text-text-secondary">
                  Empowering citizens through transparent, accessible government data.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li><a href="#api" className="hover:text-primary transition-colors">API Access</a></li>
                  <li><a href="#methodology" className="hover:text-primary transition-colors">Methodology</a></li>
                  <li><a href="#security" className="hover:text-primary transition-colors">Security</a></li>
                  <li><a href="#schedule" className="hover:text-primary transition-colors">Update Schedule</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Resources</h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li><a href="#" className="hover:text-primary transition-colors">Developer Guide</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Data Dictionary</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Sample Code</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Best Practices</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Support</h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li><a href="#" className="hover:text-primary transition-colors">Technical Support</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Community Forum</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Report Issues</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Feature Requests</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border mt-8 pt-8 text-center">
              <p className="text-sm text-text-secondary">
                © {new Date()?.getFullYear()} Our Voice Our Rights. All rights reserved. | 
                <a href="#" className="hover:text-primary transition-colors ml-1">Privacy Policy</a> | 
                <a href="#" className="hover:text-primary transition-colors ml-1">Terms of Service</a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DataTransparency;