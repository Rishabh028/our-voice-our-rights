import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DistrictSelector = ({ selectedDistrict, onDistrictChange, onCompareToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const states = [
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'bihar', label: 'Bihar' },
    { value: 'west-bengal', label: 'West Bengal' },
    { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'andhra-pradesh', label: 'Andhra Pradesh' }
  ];

  const districts = [
    { 
      id: 'agra', 
      name: 'Agra', 
      state: 'Uttar Pradesh',
      population: '44,18,797',
      area: '4,027 km²',
      performance: 'Good',
      rank: 15
    },
    { 
      id: 'pune', 
      name: 'Pune', 
      state: 'Maharashtra',
      population: '94,29,408',
      area: '15,642 km²',
      performance: 'Excellent',
      rank: 3
    },
    { 
      id: 'patna', 
      name: 'Patna', 
      state: 'Bihar',
      population: '58,38,465',
      area: '3,202 km²',
      performance: 'Average',
      rank: 45
    },
    { 
      id: 'kolkata', 
      name: 'Kolkata', 
      state: 'West Bengal',
      population: '44,96,694',
      area: '185 km²',
      performance: 'Good',
      rank: 22
    },
    { 
      id: 'indore', 
      name: 'Indore', 
      state: 'Madhya Pradesh',
      population: '32,76,697',
      area: '3,898 km²',
      performance: 'Excellent',
      rank: 8
    }
  ];

  const filteredDistricts = districts?.filter(district =>
    district?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    district?.state?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const handleVoiceSearch = () => {
    setIsVoiceActive(true);
    // Mock voice search functionality
    setTimeout(() => {
      setSearchQuery('Agra');
      setIsVoiceActive(false);
    }, 2000);
  };

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'Excellent': return 'text-green-600 bg-green-50';
      case 'Good': return 'text-blue-600 bg-blue-50';
      case 'Average': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-red-600 bg-red-50';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-civic-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">District Selection</h2>
          <p className="text-sm text-text-secondary mt-1">Choose a district for detailed analysis</p>
        </div>
        <Button
          variant="outline"
          iconName="GitCompare"
          iconPosition="left"
          iconSize={16}
          onClick={onCompareToggle}
        >
          Compare Districts
        </Button>
      </div>
      {/* Search Section */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search districts or states..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="pr-20"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName={isVoiceActive ? "MicOff" : "Mic"}
              iconSize={16}
              onClick={handleVoiceSearch}
              className={`p-2 ${isVoiceActive ? 'text-red-500' : 'text-gray-500'}`}
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Search"
              iconSize={16}
              className="p-2"
            />
          </div>
        </div>

        <Select
          placeholder="Filter by state"
          options={states}
          searchable
          clearable
          className="w-full"
        />
      </div>
      {/* District Results */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredDistricts?.map((district) => (
          <div
            key={district?.id}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-civic-sm ${
              selectedDistrict?.id === district?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => onDistrictChange(district)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h3 className="font-medium text-foreground">{district?.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(district?.performance)}`}>
                    {district?.performance}
                  </span>
                  <span className="text-xs text-text-secondary">
                    Rank #{district?.rank}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mt-1">{district?.state}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-text-secondary">
                  <span className="flex items-center">
                    <Icon name="Users" size={12} className="mr-1" />
                    {district?.population}
                  </span>
                  <span className="flex items-center">
                    <Icon name="MapPin" size={12} className="mr-1" />
                    {district?.area}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="BarChart3"
                  iconSize={14}
                  className="p-2"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  iconSize={14}
                  className="p-2"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredDistricts?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-text-secondary">No districts found matching your search</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSearchQuery('')}
            className="mt-2"
          >
            Clear Search
          </Button>
        </div>
      )}
      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" iconName="MapPin" iconPosition="left" iconSize={14}>
            Detect Location
          </Button>
          <Button variant="ghost" size="sm" iconName="Star" iconPosition="left" iconSize={14}>
            Top Performers
          </Button>
          <Button variant="ghost" size="sm" iconName="TrendingDown" iconPosition="left" iconSize={14}>
            Needs Attention
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DistrictSelector;