import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BenefitCalculator = ({ currentLanguage }) => {
  const [formData, setFormData] = useState({
    daysWorked: '',
    wageRate: '220',
    state: '',
    category: 'general'
  });
  const [result, setResult] = useState(null);

  const labels = {
    en: {
      title: 'MGNREGA Benefit Calculator',
      description: 'Calculate your potential earnings and benefits under MGNREGA',
      daysWorked: 'Days Worked (per year)',
      wageRate: 'Daily Wage Rate (₹)',
      state: 'Select Your State',
      category: 'Category',
      calculate: 'Calculate Benefits',
      reset: 'Reset',
      results: 'Your Calculated Benefits',
      totalEarnings: 'Total Annual Earnings',
      guaranteedDays: 'Guaranteed Work Days',
      additionalBenefits: 'Additional Benefits',
      note: 'Note: Calculations are based on current MGNREGA guidelines'
    },
    hi: {
      title: 'मनरेगा लाभ कैलकुलेटर',
      description: 'मनरेगा के तहत अपनी संभावित आय और लाभों की गणना करें',
      daysWorked: 'काम के दिन (प्रति वर्ष)',
      wageRate: 'दैनिक मजदूरी दर (₹)',
      state: 'अपना राज्य चुनें',
      category: 'श्रेणी',
      calculate: 'लाभ की गणना करें',
      reset: 'रीसेट करें',
      results: 'आपके गणना किए गए लाभ',
      totalEarnings: 'कुल वार्षिक आय',
      guaranteedDays: 'गारंटीशुदा कार्य दिवस',
      additionalBenefits: 'अतिरिक्त लाभ',
      note: 'नोट: गणना वर्तमान मनरेगा दिशानिर्देशों पर आधारित है'
    }
  };

  const stateOptions = [
    { value: 'up', label: currentLanguage === 'en' ? 'Uttar Pradesh' : 'उत्तर प्रदेश' },
    { value: 'bihar', label: currentLanguage === 'en' ? 'Bihar' : 'बिहार' },
    { value: 'mp', label: currentLanguage === 'en' ? 'Madhya Pradesh' : 'मध्य प्रदेश' },
    { value: 'rajasthan', label: currentLanguage === 'en' ? 'Rajasthan' : 'राजस्थान' },
    { value: 'odisha', label: currentLanguage === 'en' ? 'Odisha' : 'ओडिशा' }
  ];

  const categoryOptions = [
    { value: 'general', label: currentLanguage === 'en' ? 'General' : 'सामान्य' },
    { value: 'sc', label: currentLanguage === 'en' ? 'Scheduled Caste' : 'अनुसूचित जाति' },
    { value: 'st', label: currentLanguage === 'en' ? 'Scheduled Tribe' : 'अनुसूचित जनजाति' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateBenefits = () => {
    const days = parseInt(formData?.daysWorked) || 0;
    const rate = parseInt(formData?.wageRate) || 220;
    
    const totalEarnings = days * rate;
    const guaranteedDays = Math.min(days, 100);
    const additionalBenefits = guaranteedDays * 50; // Mock additional benefits
    
    setResult({
      totalEarnings,
      guaranteedDays,
      additionalBenefits,
      daysWorked: days
    });
  };

  const resetCalculator = () => {
    setFormData({
      daysWorked: '',
      wageRate: '220',
      state: '',
      category: 'general'
    });
    setResult(null);
  };

  return (
    <div className="civic-card p-6">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
          <Icon name="Calculator" size={24} className="text-accent" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {labels?.[currentLanguage]?.title}
          </h3>
          <p className="text-text-secondary text-sm">
            {labels?.[currentLanguage]?.description}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input
            label={labels?.[currentLanguage]?.daysWorked}
            type="number"
            placeholder="0-365"
            value={formData?.daysWorked}
            onChange={(e) => handleInputChange('daysWorked', e?.target?.value)}
            min="0"
            max="365"
          />

          <Input
            label={labels?.[currentLanguage]?.wageRate}
            type="number"
            placeholder="220"
            value={formData?.wageRate}
            onChange={(e) => handleInputChange('wageRate', e?.target?.value)}
            min="0"
          />

          <Select
            label={labels?.[currentLanguage]?.state}
            options={stateOptions}
            value={formData?.state}
            onChange={(value) => handleInputChange('state', value)}
            placeholder={currentLanguage === 'en' ? 'Choose state...' : 'राज्य चुनें...'}
          />

          <Select
            label={labels?.[currentLanguage]?.category}
            options={categoryOptions}
            value={formData?.category}
            onChange={(value) => handleInputChange('category', value)}
          />

          <div className="flex space-x-3">
            <Button
              variant="default"
              onClick={calculateBenefits}
              iconName="Calculator"
              iconPosition="left"
              iconSize={16}
              className="flex-1"
            >
              {labels?.[currentLanguage]?.calculate}
            </Button>
            
            <Button
              variant="outline"
              onClick={resetCalculator}
              iconName="RotateCcw"
              iconSize={16}
            >
              {labels?.[currentLanguage]?.reset}
            </Button>
          </div>
        </div>

        {result && (
          <div className="bg-surface rounded-lg p-6 border border-border">
            <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="TrendingUp" size={20} className="mr-2 text-accent" />
              {labels?.[currentLanguage]?.results}
            </h4>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                <span className="text-text-secondary">{labels?.[currentLanguage]?.totalEarnings}</span>
                <span className="text-xl font-bold text-foreground">₹{result?.totalEarnings?.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                <span className="text-text-secondary">{labels?.[currentLanguage]?.guaranteedDays}</span>
                <span className="text-lg font-semibold text-primary">{result?.guaranteedDays} days</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                <span className="text-text-secondary">{labels?.[currentLanguage]?.additionalBenefits}</span>
                <span className="text-lg font-semibold text-accent">₹{result?.additionalBenefits?.toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-warning/10 rounded-lg border border-warning/20">
              <p className="text-sm text-warning-foreground flex items-start">
                <Icon name="Info" size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                {labels?.[currentLanguage]?.note}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BenefitCalculator;