import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCards = ({ userLocation }) => {
  const quickActions = [
    {
      id: 'check-status',
      title: 'Check Job Card Status',
      description: 'Verify your MGNREGA job card and work allocation status',
      icon: 'CreditCard',
      color: 'primary',
      route: '/dashboard',
      stats: '2.3M+ checks this month',
      popular: true
    },
    {
      id: 'compare-districts',
      title: 'Compare Districts',
      description: 'See how your district performs against neighbors',
      icon: 'GitCompare',
      color: 'secondary',
      route: '/comparison-tool',
      stats: 'Compare 732 districts',
      popular: false
    },
    {
      id: 'learn-rights',
      title: 'Know Your Rights',
      description: 'Learn about MGNREGA benefits and entitlements',
      icon: 'BookOpen',
      color: 'accent',
      route: '/education-center',
      stats: 'Available in 12 languages',
      popular: true
    },
    {
      id: 'track-payments',
      title: 'Track Payments',
      description: 'Monitor wage payments and fund utilization',
      icon: 'Wallet',
      color: 'warning',
      route: '/dashboard',
      stats: '₹45,000 Cr tracked',
      popular: false
    },
    {
      id: 'report-issue',
      title: 'Report Issues',
      description: 'Submit complaints and track resolution status',
      icon: 'AlertTriangle',
      color: 'error',
      route: '/dashboard',
      stats: '89% issues resolved',
      popular: false
    },
    {
      id: 'view-transparency',
      title: 'Data Transparency',
      description: 'Access open government data and reports',
      icon: 'Database',
      color: 'muted',
      route: '/data-transparency',
      stats: 'Real-time updates',
      popular: true
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20',
      secondary: 'bg-secondary/10 border-secondary/20 text-secondary hover:bg-secondary/20',
      accent: 'bg-accent/10 border-accent/20 text-accent hover:bg-accent/20',
      warning: 'bg-warning/10 border-warning/20 text-warning hover:bg-warning/20',
      error: 'bg-error/10 border-error/20 text-error hover:bg-error/20',
      muted: 'bg-muted border-border text-text-secondary hover:bg-muted/80'
    };
    return colorMap?.[color] || colorMap?.muted;
  };

  const getIconColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      accent: 'bg-accent text-accent-foreground',
      warning: 'bg-warning text-warning-foreground',
      error: 'bg-error text-error-foreground',
      muted: 'bg-text-secondary text-white'
    };
    return colorMap?.[color] || colorMap?.muted;
  };

  const handleActionClick = (route) => {
    window.location.href = route;
  };

  return (
    <section className="py-16 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Quick Actions for Citizens
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Access the most commonly used features to check your entitlements, 
              track progress, and stay informed about your rights.
            </p>
          </motion.div>

          {/* Location Context */}
          {userLocation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 inline-flex items-center bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium"
            >
              <Icon name="MapPin" size={16} className="mr-2" />
              Showing data for {userLocation?.name}, {userLocation?.state}
            </motion.div>
          )}
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions?.map((action, index) => (
            <motion.div
              key={action?.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`
                relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer
                bg-card hover:shadow-civic-md group-hover:scale-105
                ${getColorClasses(action?.color)}
              `}
              onClick={() => handleActionClick(action?.route)}
              >
                {/* Popular Badge */}
                {action?.popular && (
                  <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded-full">
                    Popular
                  </div>
                )}

                {/* Icon */}
                <div className={`
                  w-12 h-12 rounded-lg flex items-center justify-center mb-4
                  ${getIconColorClasses(action?.color)}
                `}>
                  <Icon name={action?.icon} size={24} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-current">
                  {action?.title}
                </h3>
                
                <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                  {action?.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium opacity-75">
                    {action?.stats}
                  </span>
                  
                  <Icon 
                    name="ArrowRight" 
                    size={16} 
                    className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" 
                  />
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-text-secondary mb-6">
            Need help getting started? Our digital guides are here to assist you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => handleActionClick('/education-center')}
              iconName="HelpCircle"
              iconPosition="left"
            >
              Get Help & Support
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => handleActionClick('/dashboard')}
              iconName="Play"
              iconPosition="left"
            >
              Watch Tutorial Video
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickActionCards;