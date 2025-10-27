import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ComparisonSelector = ({ onComparisonUpdate, selectedDistricts }) => {
  const [district1, setDistrict1] = useState('');
  const [district2, setDistrict2] = useState('');
  const [comparisonType, setComparisonType] = useState('performance');
  const [timeframe, setTimeframe] = useState('current');

  const districtOptions = [
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'pune', label: 'Pune' },
    { value: 'nashik', label: 'Nashik' },
    { value: 'nagpur', label: 'Nagpur' },
    { value: 'aurangabad', label: 'Aurangabad' },
    { value: 'solapur', label: 'Solapur' },
    { value: 'kolhapur', label: 'Kolhapur' },
    { value: 'sangli', label: 'Sangli' },
    { value: 'ahmednagar', label: 'Ahmednagar' },
    { value: 'jalgaon', label: 'Jalgaon' },
    { value: 'dhule', label: 'Dhule' },
    { value: 'nanded', label: 'Nanded' },
    { value: 'latur', label: 'Latur' },
    { value: 'osmanabad', label: 'Osmanabad' },
    { value: 'beed', label: 'Beed' }
  ];

  const comparisonTypeOptions = [
    { value: 'performance', label: 'Overall Performance' },
    { value: 'employment', label: 'Employment Generation' },
    { value: 'wages', label: 'Wage Distribution' },
    { value: 'completion', label: 'Work Completion Rate' },
    { value: 'transparency', label: 'Transparency Index' }
  ];

  const timeframeOptions = [
    { value: 'current', label: 'Current Year (2024-25)' },
    { value: 'previous', label: 'Previous Year (2023-24)' },
    { value: 'last3years', label: 'Last 3 Years' },
    { value: 'last5years', label: 'Last 5 Years' }
  ];

  const handleCompare = () => {
    if (district1 && district2 && district1 !== district2) {
      onComparisonUpdate({
        district1,
        district2,
        comparisonType,
        timeframe
      });
    }
  };

  const handleSwapDistricts = () => {
    const temp = district1;
    setDistrict1(district2);
    setDistrict2(temp);
  };

  const canCompare = district1 && district2 && district1 !== district2;

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-civic-elevation">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
          <Icon name="GitCompare" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">District Comparison</h2>
          <p className="text-sm text-text-secondary">Compare performance metrics between districts</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* District Selection */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground mb-3">Select Districts to Compare</h3>
          
          <div className="relative">
            <Select
              label="First District"
              options={districtOptions?.filter(option => option?.value !== district2)}
              value={district1}
              onChange={setDistrict1}
              placeholder="Choose first district"
              searchable
              className="mb-4"
            />
            
            <div className="flex justify-center my-2">
              <Button
                variant="ghost"
                onClick={handleSwapDistricts}
                iconName="ArrowUpDown"
                iconSize={16}
                disabled={!district1 || !district2}
                className="px-3 py-2"
              >
                Swap
              </Button>
            </div>
            
            <Select
              label="Second District"
              options={districtOptions?.filter(option => option?.value !== district1)}
              value={district2}
              onChange={setDistrict2}
              placeholder="Choose second district"
              searchable
            />
          </div>
        </div>

        {/* Comparison Options */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground mb-3">Comparison Parameters</h3>
          
          <Select
            label="Comparison Type"
            options={comparisonTypeOptions}
            value={comparisonType}
            onChange={setComparisonType}
            className="mb-4"
          />
          
          <Select
            label="Time Period"
            options={timeframeOptions}
            value={timeframe}
            onChange={setTimeframe}
          />
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          onClick={handleCompare}
          disabled={!canCompare}
          iconName="BarChart3"
          iconPosition="left"
          iconSize={18}
          className="flex-1"
        >
          Compare Districts
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            setDistrict1('');
            setDistrict2('');
            setComparisonType('performance');
            setTimeframe('current');
          }}
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={18}
        >
          Reset
        </Button>
      </div>
      {/* Quick Comparison Suggestions */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Popular Comparisons</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { d1: 'mumbai', d2: 'pune', label: 'Mumbai vs Pune' },
            { d1: 'nagpur', d2: 'nashik', label: 'Nagpur vs Nashik' },
            { d1: 'aurangabad', d2: 'solapur', label: 'Aurangabad vs Solapur' }
          ]?.map((suggestion, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => {
                setDistrict1(suggestion?.d1);
                setDistrict2(suggestion?.d2);
              }}
              className="text-xs"
            >
              {suggestion?.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparisonSelector;