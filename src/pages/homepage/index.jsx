import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import QuickActionCards from './components/QuickActionCards';
import TrendingMetrics from './components/TrendingMetrics';
import LocationAwareInsights from './components/LocationAwareInsights';
import CTASection from './components/CTASection';

const Homepage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLocationDetect = (location) => {
    setUserLocation(location);
    // Save location to localStorage for future visits
    localStorage.setItem('userLocation', JSON.stringify(location));
  };

  useEffect(() => {
    // Check for saved location
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      try {
        setUserLocation(JSON.parse(savedLocation));
      } catch (error) {
        console.error('Error parsing saved location:', error);
      }
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Voice Our Rights - Civic Transparency & Government Data Platform</title>
        <meta 
          name="description" 
          content="Transforming complex government data into accessible insights. Empowering every citizen with transparency, accountability, and the knowledge to demand better governance across India's 732 districts." 
        />
        <meta name="keywords" content="MGNREGA, government transparency, civic engagement, rural employment, India districts, data visualization, citizen rights" />
        <meta property="og:title" content="Our Voice Our Rights - Digital Sarpanch for Transparent Governance" />
        <meta property="og:description" content="Join India's largest civic transparency initiative. Access real-time government data, track MGNREGA performance, and empower your community with knowledge." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://ourvoiceourights.gov.in/homepage" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header Navigation */}
        <Header />

        {/* Main Content */}
        <main className="pt-0">
          {/* Hero Section with Location Detection */}
          <HeroSection 
            userLocation={userLocation}
            onLocationDetect={handleLocationDetect}
          />

          {/* Quick Action Cards for Common Tasks */}
          <QuickActionCards 
            userLocation={userLocation}
          />

          {/* Trending Performance Metrics */}
          <TrendingMetrics 
            userLocation={userLocation}
          />

          {/* Location-Aware Insights */}
          <LocationAwareInsights 
            userLocation={userLocation}
          />

          {/* Call to Action Section */}
          <CTASection />
        </main>

        {/* Footer */}
        <footer className="bg-surface border-t border-border py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="md:col-span-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary-foreground"
                    >
                      <path
                        d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                        fill="currentColor"
                      />
                      <path
                        d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z"
                        fill="currentColor"
                      />
                      <path
                        d="M5 9L5.5 11.5L8 12L5.5 12.5L5 15L4.5 12.5L2 12L4.5 11.5L5 9Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Our Voice</h3>
                    <p className="text-sm text-text-secondary -mt-1">Our Rights</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Empowering citizens through transparent governance and accessible government data.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/dashboard" className="text-text-secondary hover:text-foreground transition-colors">Dashboard</a></li>
                  <li><a href="/district-analysis" className="text-text-secondary hover:text-foreground transition-colors">District Analysis</a></li>
                  <li><a href="/education-center" className="text-text-secondary hover:text-foreground transition-colors">Education Center</a></li>
                  <li><a href="/comparison-tool" className="text-text-secondary hover:text-foreground transition-colors">Comparison Tool</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/data-transparency" className="text-text-secondary hover:text-foreground transition-colors">Data Transparency</a></li>
                  <li><a href="/education-center" className="text-text-secondary hover:text-foreground transition-colors">Help & Support</a></li>
                  <li><a href="/education-center" className="text-text-secondary hover:text-foreground transition-colors">API Documentation</a></li>
                  <li><a href="/education-center" className="text-text-secondary hover:text-foreground transition-colors">Privacy Policy</a></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Connect</h4>
                <ul className="space-y-2 text-sm">
                  <li className="text-text-secondary">Email: support@ourvoiceourights.gov.in</li>
                  <li className="text-text-secondary">Helpline: 1800-XXX-XXXX</li>
                  <li className="text-text-secondary">Mon-Fri: 9:00 AM - 6:00 PM IST</li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-text-secondary">
                © {new Date()?.getFullYear()} Our Voice Our Rights. All rights reserved. | Government of India Initiative
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="text-xs text-text-secondary">Powered by</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-foreground">data.gov.in</span>
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;