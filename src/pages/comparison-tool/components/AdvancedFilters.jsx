import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AdvancedFilters = ({ onFiltersApply, isOpen, onToggle }) => {
  const [filters, setFilters] = useState({
    states: [],
    populationRange: { min: '', max: '' },
    performanceRange: { min: '', max: '' },
    categories: [],
    timeframe: 'current',
    sortBy: 'performance',
    sortOrder: 'desc'
  });

  const stateOptions = [
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
    { value: 'west-bengal', label: 'West Bengal' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'andhra-pradesh', label: 'Andhra Pradesh' }
  ];

  const categoryOptions = [
    { value: 'rural', label: 'Rural Districts' },
    { value: 'tribal', label: 'Tribal Areas' },
    { value: 'drought-prone', label: 'Drought Prone' },
    { value: 'backward', label: 'Backward Districts' },
    { value: 'aspirational', label: 'Aspirational Districts' }
  ];

  const timeframeOptions = [
    { value: 'current', label: 'Current Year (2024-25)' },
    { value: 'previous', label: 'Previous Year (2023-24)' },
    { value: 'last3years', label: 'Last 3 Years' },
    { value: 'last5years', label: 'Last 5 Years' }
  ];

  const sortByOptions = [
    { value: 'performance', label: 'Overall Performance' },
    { value: 'employment', label: 'Employment Generation' },
    { value: 'wages', label: 'Wage Distribution' },
    { value: 'completion', label: 'Work Completion' },
    { value: 'transparency', label: 'Transparency Score' },
    { value: 'population', label: 'Population Size' }
  ];

  const sortOrderOptions = [
    { value: 'desc', label: 'Highest to Lowest' },
    { value: 'asc', label: 'Lowest to Highest' }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleRangeChange = (rangeType, field, value) => {
    setFilters(prev => ({
      ...prev,
      [rangeType]: {
        ...prev?.[rangeType],
        [field]: value
      }
    }));
  };

  const handleApplyFilters = () => {
    onFiltersApply(filters);
    onToggle();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      states: [],
      populationRange: { min: '', max: '' },
      performanceRange: { min: '', max: '' },
      categories: [],
      timeframe: 'current',
      sortBy: 'performance',
      sortOrder: 'desc'
    };
    setFilters(resetFilters);
    onFiltersApply(resetFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.states?.length > 0) count++;
    if (filters?.populationRange?.min || filters?.populationRange?.max) count++;
    if (filters?.performanceRange?.min || filters?.performanceRange?.max) count++;
    if (filters?.categories?.length > 0) count++;
    if (filters?.timeframe !== 'current') count++;
    if (filters?.sortBy !== 'performance' || filters?.sortOrder !== 'desc') count++;
    return count;
  };

  if (!isOpen) {
    return (
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          iconSize={18}
          className="relative"
        >
          Advanced Filters
          {getActiveFiltersCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {getActiveFiltersCount()}
            </span>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border shadow-civic-elevation mb-6">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Icon name="Filter" size={20} className="text-primary mr-3" />
            <h3 className="text-lg font-semibold text-foreground">Advanced Filters</h3>
          </div>
          <Button
            variant="ghost"
            onClick={onToggle}
            iconName="X"
            iconSize={18}
            className="p-2"
          />
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Geographic Filters */}
        <div>
          <h4 className="text-md font-medium text-foreground mb-4">Geographic Filters</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="States"
              options={stateOptions}
              value={filters?.states}
              onChange={(value) => handleFilterChange('states', value)}
              multiple
              searchable
              placeholder="Select states to include"
            />
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">District Categories</label>
              <div className="space-y-2">
                {categoryOptions?.map((category) => (
                  <Checkbox
                    key={category?.value}
                    label={category?.label}
                    checked={filters?.categories?.includes(category?.value)}
                    onChange={(e) => {
                      const newCategories = e?.target?.checked
                        ? [...filters?.categories, category?.value]
                        : filters?.categories?.filter(c => c !== category?.value);
                      handleFilterChange('categories', newCategories);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Numeric Filters */}
        <div>
          <h4 className="text-md font-medium text-foreground mb-4">Numeric Filters</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Population Range</label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  placeholder="Min (lakhs)"
                  value={filters?.populationRange?.min}
                  onChange={(e) => handleRangeChange('populationRange', 'min', e?.target?.value)}
                />
                <Input
                  type="number"
                  placeholder="Max (lakhs)"
                  value={filters?.populationRange?.max}
                  onChange={(e) => handleRangeChange('populationRange', 'max', e?.target?.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Performance Score Range</label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  placeholder="Min score"
                  min="0"
                  max="100"
                  value={filters?.performanceRange?.min}
                  onChange={(e) => handleRangeChange('performanceRange', 'min', e?.target?.value)}
                />
                <Input
                  type="number"
                  placeholder="Max score"
                  min="0"
                  max="100"
                  value={filters?.performanceRange?.max}
                  onChange={(e) => handleRangeChange('performanceRange', 'max', e?.target?.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Time and Sorting */}
        <div>
          <h4 className="text-md font-medium text-foreground mb-4">Time Period & Sorting</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Time Period"
              options={timeframeOptions}
              value={filters?.timeframe}
              onChange={(value) => handleFilterChange('timeframe', value)}
            />
            
            <Select
              label="Sort By"
              options={sortByOptions}
              value={filters?.sortBy}
              onChange={(value) => handleFilterChange('sortBy', value)}
            />
            
            <Select
              label="Sort Order"
              options={sortOrderOptions}
              value={filters?.sortOrder}
              onChange={(value) => handleFilterChange('sortOrder', value)}
            />
          </div>
        </div>

        {/* Statistical Options */}
        <div>
          <h4 className="text-md font-medium text-foreground mb-4">Statistical Options</h4>
          <div className="space-y-3">
            <Checkbox
              label="Show statistical significance indicators"
              checked={filters?.showSignificance || false}
              onChange={(e) => handleFilterChange('showSignificance', e?.target?.checked)}
              description="Highlight statistically significant differences in comparisons"
            />
            
            <Checkbox
              label="Include trend projections"
              checked={filters?.includeTrends || false}
              onChange={(e) => handleFilterChange('includeTrends', e?.target?.checked)}
              description="Show projected performance trends based on historical data"
            />
            
            <Checkbox
              label="Enable collaborative workspace"
              checked={filters?.enableCollaboration || false}
              onChange={(e) => handleFilterChange('enableCollaboration', e?.target?.checked)}
              description="Allow team members to add notes and annotations"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            variant="default"
            onClick={handleApplyFilters}
            iconName="Check"
            iconPosition="left"
            iconSize={16}
            className="flex-1"
          >
            Apply Filters ({getActiveFiltersCount()} active)
          </Button>
          
          <Button
            variant="outline"
            onClick={handleResetFilters}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
          >
            Reset All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;