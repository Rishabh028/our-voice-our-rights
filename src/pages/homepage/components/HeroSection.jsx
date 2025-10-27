import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = ({ userLocation, onLocationDetect }) => {
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    districts: 0,
    beneficiaries: 0,
    transparency: 0
  });

  const targetStats = {
    districts: 732,
    beneficiaries: 15.2,
    transparency: 98.5
  };

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedStats({
          districts: Math.floor(targetStats?.districts * progress),
          beneficiaries: (targetStats?.beneficiaries * progress)?.toFixed(1),
          transparency: (targetStats?.transparency * progress)?.toFixed(1)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleLocationDetection = async () => {
    setIsDetectingLocation(true);
    
    try {
      if (navigator.geolocation) {
        navigator.geolocation?.getCurrentPosition(
          (position) => {
            const mockDistrict = {
              name: "Nashik",
              state: "Maharashtra",
              lat: position?.coords?.latitude,
              lng: position?.coords?.longitude,
              performance: 87.5,
              rank: 45
            };
            onLocationDetect(mockDistrict);
            setIsDetectingLocation(false);
          },
          () => {
            // Fallback to mock location
            const mockDistrict = {
              name: "Nashik",
              state: "Maharashtra",
              lat: 19.9975,
              lng: 73.7898,
              performance: 87.5,
              rank: 45
            };
            onLocationDetect(mockDistrict);
            setIsDetectingLocation(false);
          }
        );
      }
    } catch (error) {
      setIsDetectingLocation(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50 py-16 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent rounded-full"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Brand Badge */}
            <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Icon name="Shield" size={16} className="mr-2" />
              Digital Sarpanch - Your Trusted Guide
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              <span className="text-primary">Our Voice,</span>
              <br />
              <span className="text-secondary">Our Rights</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-text-secondary mb-8 max-w-2xl">
              Transforming complex government data into accessible insights. 
              Empowering every citizen with transparency, accountability, and the knowledge to demand better governance.
            </p>

            {/* Location Detection CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                variant="default"
                size="lg"
                onClick={handleLocationDetection}
                loading={isDetectingLocation}
                iconName="MapPin"
                iconPosition="left"
                className="px-8 py-4"
              >
                {isDetectingLocation ? 'Detecting Location...' : 'Find My District Performance'}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/dashboard'}
                iconName="BarChart3"
                iconPosition="left"
                className="px-8 py-4"
              >
                Explore Dashboard
              </Button>
            </div>

            {/* Current Location Display */}
            {userLocation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-8"
              >
                <div className="flex items-center text-accent mb-2">
                  <Icon name="MapPin" size={16} className="mr-2" />
                  <span className="font-medium">Your District</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {userLocation?.name}, {userLocation?.state}
                </h3>
                <p className="text-text-secondary text-sm">
                  Performance Score: <span className="font-medium text-accent">{userLocation?.performance}%</span> 
                  • Rank: <span className="font-medium">#{userLocation?.rank}</span>
                </p>
              </motion.div>
            )}

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary">
              <div className="flex items-center">
                <Icon name="Shield" size={16} className="mr-2 text-accent" />
                Official Government Data
              </div>
              <div className="flex items-center">
                <Icon name="Clock" size={16} className="mr-2 text-accent" />
                Updated Daily
              </div>
              <div className="flex items-center">
                <Icon name="Users" size={16} className="mr-2 text-accent" />
                Serving 50M+ Citizens
              </div>
            </div>
          </motion.div>

          {/* Right Content - Animated Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Stats Card */}
            <div className="bg-white rounded-2xl shadow-civic-lg p-8 border border-border">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Real-Time Impact Dashboard
                </h3>
                <p className="text-text-secondary">
                  Live data from across India's districts
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Districts Covered */}
                <div className="text-center p-6 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="MapPin" size={24} color="white" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {animatedStats?.districts}
                  </div>
                  <div className="text-sm font-medium text-foreground mb-1">
                    Districts Covered
                  </div>
                  <div className="text-xs text-text-secondary">
                    Across all Indian states
                  </div>
                </div>

                {/* Beneficiaries Served */}
                <div className="text-center p-6 bg-secondary/5 rounded-xl border border-secondary/10">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Users" size={24} color="white" />
                  </div>
                  <div className="text-3xl font-bold text-secondary mb-2">
                    {animatedStats?.beneficiaries}M+
                  </div>
                  <div className="text-sm font-medium text-foreground mb-1">
                    Beneficiaries Served
                  </div>
                  <div className="text-xs text-text-secondary">
                    MGNREGA participants
                  </div>
                </div>

                {/* Transparency Score */}
                <div className="text-center p-6 bg-accent/5 rounded-xl border border-accent/10">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="TrendingUp" size={24} color="white" />
                  </div>
                  <div className="text-3xl font-bold text-accent mb-2">
                    {animatedStats?.transparency}%
                  </div>
                  <div className="text-sm font-medium text-foreground mb-1">
                    Transparency Score
                  </div>
                  <div className="text-xs text-text-secondary">
                    Data accuracy & availability
                  </div>
                </div>
              </div>

              {/* Live Update Indicator */}
              <div className="flex items-center justify-center mt-6 pt-6 border-t border-border">
                <div className="flex items-center text-sm text-text-secondary">
                  <div className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></div>
                  Last updated: {new Date()?.toLocaleTimeString('en-IN', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    timeZone: 'Asia/Kolkata'
                  })} IST
                </div>
              </div>
            </div>

            {/* Floating Action Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-civic-md p-4 border border-border"
            >
              <div className="flex items-center text-sm">
                <Icon name="TrendingUp" size={16} className="text-accent mr-2" />
                <span className="font-medium text-foreground">+12% improvement</span>
              </div>
              <p className="text-xs text-text-secondary mt-1">This month vs last</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute -top-4 -right-4 bg-white rounded-lg shadow-civic-md p-4 border border-border"
            >
              <div className="flex items-center text-sm">
                <Icon name="Award" size={16} className="text-secondary mr-2" />
                <span className="font-medium text-foreground">Top Performer</span>
              </div>
              <p className="text-xs text-text-secondary mt-1">Kerala leads this quarter</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;