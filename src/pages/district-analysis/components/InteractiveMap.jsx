import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const InteractiveMap = ({ selectedDistrict, onDistrictSelect }) => {
  const [mapView, setMapView] = useState('performance');
  const [overlayType, setOverlayType] = useState('none');

  const mapViewOptions = [
    { value: 'performance', label: 'Performance Overview' },
    { value: 'employment', label: 'Employment Data' },
    { value: 'wages', label: 'Wage Distribution' },
    { value: 'demographics', label: 'Demographics' }
  ];

  const overlayOptions = [
    { value: 'none', label: 'No Overlay' },
    { value: 'population', label: 'Population Density' },
    { value: 'rural-urban', label: 'Rural-Urban Split' },
    { value: 'literacy', label: 'Literacy Rate' },
    { value: 'infrastructure', label: 'Infrastructure Score' }
  ];

  const neighboringDistricts = [
    { 
      id: 'mathura', 
      name: 'Mathura', 
      performance: 'Good', 
      distance: '58 km',
      coordinates: { lat: 27.4924, lng: 77.6737 }
    },
    { 
      id: 'firozabad', 
      name: 'Firozabad', 
      performance: 'Average', 
      distance: '42 km',
      coordinates: { lat: 27.1592, lng: 78.3957 }
    },
    { 
      id: 'etah', 
      name: 'Etah', 
      performance: 'Good', 
      distance: '67 km',
      coordinates: { lat: 27.6300, lng: 78.6644 }
    },
    { 
      id: 'mainpuri', 
      name: 'Mainpuri', 
      performance: 'Average', 
      distance: '89 km',
      coordinates: { lat: 27.2356, lng: 79.0269 }
    }
  ];

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'Excellent': return '#16a34a';
      case 'Good': return '#2563eb';
      case 'Average': return '#d97706';
      default: return '#dc2626';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-civic-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Interactive District Map</h2>
          <p className="text-sm text-text-secondary mt-1">
            Explore {selectedDistrict?.name || 'district'} and neighboring regions
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Select
            options={mapViewOptions}
            value={mapView}
            onChange={setMapView}
            className="w-48"
          />
          
          <Select
            options={overlayOptions}
            value={overlayType}
            onChange={setOverlayType}
            className="w-40"
          />
          
          <Button
            variant="outline"
            iconName="Maximize2"
            iconSize={16}
            className="p-2"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <div className="relative bg-slate-50 rounded-lg overflow-hidden" style={{ height: '400px' }}>
            {/* Google Maps Iframe */}
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Agra District Map"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=27.1767,78.0081&z=10&output=embed"
              className="border-0"
            />
            
            {/* Map Controls Overlay */}
            <div className="absolute top-4 left-4 bg-white rounded-lg shadow-civic-sm p-2 space-y-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="ZoomIn"
                iconSize={16}
                className="p-2 w-full"
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="ZoomOut"
                iconSize={16}
                className="p-2 w-full"
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="RotateCcw"
                iconSize={16}
                className="p-2 w-full"
              />
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-civic-sm p-3">
              <h4 className="text-sm font-medium text-foreground mb-2">Performance Legend</h4>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-text-secondary">Excellent (90%+)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs text-text-secondary">Good (70-89%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs text-text-secondary">Average (50-69%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs text-text-secondary">Needs Improvement (&lt;50%)</span>
                </div>
              </div>
            </div>

            {/* Current District Marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-civic-sm animate-pulse"></div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                  {selectedDistrict?.name || 'Current District'}
                </div>
              </div>
            </div>
          </div>

          {/* Map Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">4,027</div>
              <div className="text-xs text-blue-700">Area (km²)</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">44.2L</div>
              <div className="text-xs text-green-700">Population</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-lg font-bold text-orange-600">1,098</div>
              <div className="text-xs text-orange-700">Density/km²</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">73.4%</div>
              <div className="text-xs text-purple-700">Literacy Rate</div>
            </div>
          </div>
        </div>

        {/* Neighboring Districts Panel */}
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-foreground mb-3">Neighboring Districts</h3>
            <div className="space-y-3">
              {neighboringDistricts?.map((district) => (
                <div
                  key={district?.id}
                  className="p-3 border border-border rounded-lg hover:border-primary/50 cursor-pointer transition-colors duration-200"
                  onClick={() => onDistrictSelect(district)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-foreground text-sm">{district?.name}</h4>
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getPerformanceColor(district?.performance) }}
                        />
                      </div>
                      <p className="text-xs text-text-secondary mt-1">{district?.distance} away</p>
                      <p className="text-xs text-text-secondary">{district?.performance} Performance</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="ExternalLink"
                      iconSize={14}
                      className="p-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-border">
            <h4 className="font-medium text-foreground mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="Download"
                iconPosition="left"
                iconSize={14}
              >
                Download Map
              </Button>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="Share2"
                iconPosition="left"
                iconSize={14}
              >
                Share Location
              </Button>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="Navigation"
                iconPosition="left"
                iconSize={14}
              >
                Get Directions
              </Button>
            </div>
          </div>

          {/* Demographic Info */}
          <div className="pt-4 border-t border-border">
            <h4 className="font-medium text-foreground mb-3">Demographics</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Rural Population</span>
                <span className="text-sm font-medium text-foreground">78.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Urban Population</span>
                <span className="text-sm font-medium text-foreground">21.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">SC Population</span>
                <span className="text-sm font-medium text-foreground">22.1%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">ST Population</span>
                <span className="text-sm font-medium text-foreground">0.1%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;