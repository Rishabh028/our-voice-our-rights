import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DistrictSelector = ({ selectedDistrict, onDistrictChange, districts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDistricts = districts?.filter(district =>
    district?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    district?.state?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleDistrictSelect = (district) => {
    onDistrictChange(district);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        iconName="MapPin"
        iconPosition="left"
        iconSize={18}
        className="w-full sm:w-auto justify-between min-w-64"
      >
        <span className="truncate">
          {selectedDistrict ? `${selectedDistrict?.name}, ${selectedDistrict?.state}` : 'Select District'}
        </span>
        <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} className="ml-2" />
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-civic-lg z-50 max-h-80 overflow-hidden">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Search districts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {filteredDistricts?.length > 0 ? (
              filteredDistricts?.map((district) => (
                <button
                  key={district?.id}
                  onClick={() => handleDistrictSelect(district)}
                  className={`w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-200 flex items-center justify-between ${
                    selectedDistrict?.id === district?.id ? 'bg-muted' : ''
                  }`}
                >
                  <div>
                    <div className="font-medium text-foreground">{district?.name}</div>
                    <div className="text-sm text-text-secondary">{district?.state}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      district?.performance >= 80 ? 'text-success' : 
                      district?.performance >= 60 ? 'text-warning' : 'text-error'
                    }`}>
                      {district?.performance}%
                    </div>
                    <div className="text-xs text-text-secondary">Performance</div>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-text-secondary">
                <Icon name="Search" size={24} className="mx-auto mb-2 opacity-50" />
                <p>No districts found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DistrictSelector;