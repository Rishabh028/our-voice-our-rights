import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscription = async (e) => {
    e?.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  const engagementStats = [
    {
      number: '2.3M+',
      label: 'Citizens Empowered',
      icon: 'Users',
      color: 'primary'
    },
    {
      number: '732',
      label: 'Districts Covered',
      icon: 'MapPin',
      color: 'secondary'
    },
    {
      number: '98.5%',
      label: 'Data Accuracy',
      icon: 'Shield',
      color: 'accent'
    },
    {
      number: '24/7',
      label: 'Real-time Updates',
      icon: 'Clock',
      color: 'warning'
    }
  ];

  const actionCards = [
    {
      title: 'For Citizens',
      description: 'Access your rights, track benefits, and hold government accountable',
      icon: 'User',
      color: 'primary',
      actions: [
        { label: 'Check Job Card Status', route: '/dashboard' },
        { label: 'Learn Your Rights', route: '/education-center' },
        { label: 'Compare Districts', route: '/comparison-tool' }
      ]
    },
    {
      title: 'For Activists',
      description: 'Use data-driven insights for advocacy and community organizing',
      icon: 'Megaphone',
      color: 'secondary',
      actions: [
        { label: 'Download Reports', route: '/data-transparency' },
        { label: 'Access API', route: '/data-transparency' },
        { label: 'Share Insights', route: '/dashboard' }
      ]
    },
    {
      title: 'For Officials',
      description: 'Monitor performance, identify gaps, and improve implementation',
      icon: 'Building',
      color: 'accent',
      actions: [
        { label: 'Performance Dashboard', route: '/dashboard' },
        { label: 'District Analysis', route: '/district-analysis' },
        { label: 'Benchmark Reports', route: '/comparison-tool' }
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'text-primary bg-primary/10 border-primary/20',
      secondary: 'text-secondary bg-secondary/10 border-secondary/20',
      accent: 'text-accent bg-accent/10 border-accent/20',
      warning: 'text-warning bg-warning/10 border-warning/20'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Join the Movement for
              <span className="block text-primary">Transparent Governance</span>
            </h2>
            
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
              Be part of India's largest civic transparency initiative. 
              Together, we can build a more accountable and responsive government.
            </p>

            {/* Newsletter Subscription */}
            <div className="max-w-md mx-auto mb-8">
              {!isSubscribed ? (
                <form onSubmit={handleSubscription} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e?.target?.value)}
                    className="flex-1"
                    required
                  />
                  <Button
                    type="submit"
                    variant="default"
                    loading={isLoading}
                    iconName="Mail"
                    iconPosition="left"
                    className="px-6"
                  >
                    Get Updates
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-accent"
                >
                  <div className="flex items-center justify-center">
                    <Icon name="CheckCircle" size={20} className="mr-2" />
                    <span className="font-medium">Successfully subscribed!</span>
                  </div>
                  <p className="text-sm mt-1 opacity-80">
                    You'll receive monthly updates on transparency initiatives.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-text-secondary">
              <div className="flex items-center">
                <Icon name="Shield" size={16} className="mr-2 text-accent" />
                Privacy Protected
              </div>
              <div className="flex items-center">
                <Icon name="Zap" size={16} className="mr-2 text-accent" />
                No Spam, Ever
              </div>
              <div className="flex items-center">
                <Icon name="Users" size={16} className="mr-2 text-accent" />
                Join 50K+ Subscribers
              </div>
            </div>
          </div>
        </motion.div>

        {/* Engagement Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {engagementStats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`
                w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2
                ${getColorClasses(stat?.color)}
              `}>
                <Icon name={stat?.icon} size={24} />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {stat?.number}
              </div>
              <div className="text-sm text-text-secondary">
                {stat?.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Action Cards for Different User Types */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {actionCards?.map((card, index) => (
            <div key={index} className="bg-card rounded-2xl p-8 border border-border shadow-civic-md hover:shadow-civic-lg transition-all duration-300 group">
              <div className={`
                w-16 h-16 rounded-xl flex items-center justify-center mb-6 border-2
                ${getColorClasses(card?.color)} group-hover:scale-110 transition-transform duration-300
              `}>
                <Icon name={card?.icon} size={28} />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {card?.title}
              </h3>
              
              <p className="text-text-secondary mb-6 leading-relaxed">
                {card?.description}
              </p>
              
              <div className="space-y-3">
                {card?.actions?.map((action, actionIndex) => (
                  <button
                    key={actionIndex}
                    onClick={() => window.location.href = action?.route}
                    className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-surface transition-colors duration-200 flex items-center justify-between group/action"
                  >
                    {action?.label}
                    <Icon 
                      name="ArrowRight" 
                      size={14} 
                      className="opacity-50 group-hover/action:opacity-100 group-hover/action:translate-x-1 transition-all duration-200" 
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Final Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-card rounded-2xl p-12 border border-border shadow-civic-lg"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Ready to Make a Difference?
            </h3>
            
            <p className="text-lg text-text-secondary mb-8">
              Start exploring government data, understand your rights, and join millions of citizens 
              working towards a more transparent and accountable India.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                onClick={() => window.location.href = '/dashboard'}
                iconName="BarChart3"
                iconPosition="left"
                className="px-8 py-4"
              >
                Explore Dashboard
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/education-center'}
                iconName="BookOpen"
                iconPosition="left"
                className="px-8 py-4"
              >
                Learn Your Rights
              </Button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-text-secondary">
                Questions? Need help getting started? 
                <button 
                  className="text-primary hover:underline ml-1"
                  onClick={() => window.location.href = '/education-center'}
                >
                  Visit our Help Center
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;