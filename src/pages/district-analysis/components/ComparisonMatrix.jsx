import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ComparisonMatrix = ({ selectedDistrict, isVisible, onClose }) => {
  const [comparisonDistricts, setComparisonDistricts] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState(['employment-days', 'wage-payments', 'job-cards']);

  const availableDistricts = [
    { value: 'agra', label: 'Agra, Uttar Pradesh' },
    { value: 'pune', label: 'Pune, Maharashtra' },
    { value: 'patna', label: 'Patna, Bihar' },
    { value: 'kolkata', label: 'Kolkata, West Bengal' },
    { value: 'indore', label: 'Indore, Madhya Pradesh' },
    { value: 'jaipur', label: 'Jaipur, Rajasthan' },
    { value: 'bangalore', label: 'Bangalore, Karnataka' },
    { value: 'ahmedabad', label: 'Ahmedabad, Gujarat' }
  ];

  const metricOptions = [
    { value: 'employment-days', label: 'Employment Days' },
    { value: 'wage-payments', label: 'Wage Payments' },
    { value: 'job-cards', label: 'Job Cards Issued' },
    { value: 'works-completed', label: 'Works Completed' },
    { value: 'women-participation', label: 'Women Participation' },
    { value: 'transparency-score', label: 'Transparency Score' }
  ];

  const comparisonData = {
    'agra': {
      name: 'Agra',
      state: 'Uttar Pradesh',
      rank: 15,
      'employment-days': { value: '45.2L', score: 87, trend: 'up' },
      'wage-payments': { value: '₹234.5Cr', score: 84, trend: 'up' },
      'job-cards': { value: '2.45L', score: 88, trend: 'up' },
      'works-completed': { value: '1,234', score: 82, trend: 'down' },
      'women-participation': { value: '67.8%', score: 92, trend: 'up' },
      'transparency-score': { value: '8.4/10', score: 84, trend: 'up' }
    },
    'pune': {
      name: 'Pune',
      state: 'Maharashtra',
      rank: 3,
      'employment-days': { value: '52.8L', score: 95, trend: 'up' },
      'wage-payments': { value: '₹298.7Cr', score: 96, trend: 'up' },
      'job-cards': { value: '2.89L', score: 94, trend: 'up' },
      'works-completed': { value: '1,567', score: 93, trend: 'up' },
      'women-participation': { value: '72.3%', score: 98, trend: 'up' },
      'transparency-score': { value: '9.1/10', score: 91, trend: 'up' }
    },
    'patna': {
      name: 'Patna',
      state: 'Bihar',
      rank: 45,
      'employment-days': { value: '38.9L', score: 72, trend: 'down' },
      'wage-payments': { value: '₹189.3Cr', score: 68, trend: 'up' },
      'job-cards': { value: '2.12L', score: 75, trend: 'up' },
      'works-completed': { value: '987', score: 65, trend: 'down' },
      'women-participation': { value: '58.4%', score: 78, trend: 'up' },
      'transparency-score': { value: '7.2/10', score: 72, trend: 'up' }
    },
    'kolkata': {
      name: 'Kolkata',
      state: 'West Bengal',
      rank: 22,
      'employment-days': { value: '41.7L', score: 79, trend: 'up' },
      'wage-payments': { value: '₹215.8Cr', score: 77, trend: 'up' },
      'job-cards': { value: '2.28L', score: 81, trend: 'up' },
      'works-completed': { value: '1,156', score: 77, trend: 'up' },
      'women-participation': { value: '64.2%', score: 86, trend: 'up' },
      'transparency-score': { value: '7.9/10', score: 79, trend: 'up' }
    },
    'indore': {
      name: 'Indore',
      state: 'Madhya Pradesh',
      rank: 8,
      'employment-days': { value: '48.6L', score: 91, trend: 'up' },
      'wage-payments': { value: '₹267.2Cr', score: 89, trend: 'up' },
      'job-cards': { value: '2.67L', score: 90, trend: 'up' },
      'works-completed': { value: '1,423', score: 89, trend: 'up' },
      'women-participation': { value: '69.7%', score: 94, trend: 'up' },
      'transparency-score': { value: '8.7/10', score: 87, trend: 'up' }
    }
  };

  const addComparisonDistrict = (districtId) => {
    if (comparisonDistricts?.length < 4 && !comparisonDistricts?.includes(districtId)) {
      setComparisonDistricts([...comparisonDistricts, districtId]);
    }
  };

  const removeComparisonDistrict = (districtId) => {
    setComparisonDistricts(comparisonDistricts?.filter(id => id !== districtId));
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 75) return 'text-blue-600 bg-blue-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getRankColor = (rank) => {
    if (rank <= 10) return 'text-green-600 bg-green-50';
    if (rank <= 25) return 'text-blue-600 bg-blue-50';
    if (rank <= 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl border border-border shadow-civic-lg max-w-7xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">District Comparison Matrix</h2>
            <p className="text-sm text-text-secondary mt-1">
              Compare up to 5 districts across key performance metrics
            </p>
          </div>
          <Button
            variant="ghost"
            iconName="X"
            iconSize={20}
            onClick={onClose}
            className="p-2"
          />
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* District Selection */}
          <div className="mb-6">
            <h3 className="font-medium text-foreground mb-3">Select Districts to Compare</h3>
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg">
                <Icon name="MapPin" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">
                  {selectedDistrict?.name || 'Base District'}
                </span>
                <span className="text-xs text-primary/70">(Base)</span>
              </div>
              
              {comparisonDistricts?.map((districtId) => (
                <div key={districtId} className="flex items-center space-x-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="text-sm font-medium text-blue-800">
                    {comparisonData?.[districtId]?.name}
                  </span>
                  <Button
                    variant="ghost"
                    iconName="X"
                    iconSize={14}
                    onClick={() => removeComparisonDistrict(districtId)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                  />
                </div>
              ))}
            </div>

            <Select
              placeholder="Add district to compare..."
              options={availableDistricts?.filter(d => !comparisonDistricts?.includes(d?.value))}
              onChange={addComparisonDistrict}
              searchable
              className="max-w-md"
            />
          </div>

          {/* Metric Selection */}
          <div className="mb-6">
            <h3 className="font-medium text-foreground mb-3">Select Metrics</h3>
            <div className="flex flex-wrap gap-2">
              {metricOptions?.map((metric) => (
                <Button
                  key={metric?.value}
                  variant={selectedMetrics?.includes(metric?.value) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    if (selectedMetrics?.includes(metric?.value)) {
                      setSelectedMetrics(selectedMetrics?.filter(m => m !== metric?.value));
                    } else {
                      setSelectedMetrics([...selectedMetrics, metric?.value]);
                    }
                  }}
                >
                  {metric?.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          {comparisonDistricts?.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-4 font-medium text-foreground border-b border-border">
                      District
                    </th>
                    <th className="text-center p-4 font-medium text-foreground border-b border-border">
                      Rank
                    </th>
                    {selectedMetrics?.map((metric) => (
                      <th key={metric} className="text-center p-4 font-medium text-foreground border-b border-border">
                        {metricOptions?.find(m => m?.value === metric)?.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Base District Row */}
                  <tr className="bg-primary/5">
                    <td className="p-4 border-b border-border">
                      <div className="flex items-center space-x-3">
                        <Icon name="Star" size={16} className="text-primary" />
                        <div>
                          <div className="font-medium text-foreground">
                            {selectedDistrict?.name || 'Base District'}
                          </div>
                          <div className="text-xs text-text-secondary">
                            {selectedDistrict?.state || 'State'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center border-b border-border">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRankColor(selectedDistrict?.rank || 15)}`}>
                        #{selectedDistrict?.rank || 15}
                      </span>
                    </td>
                    {selectedMetrics?.map((metric) => {
                      const data = comparisonData?.['agra']?.[metric];
                      return (
                        <td key={metric} className="p-4 text-center border-b border-border">
                          <div className="space-y-1">
                            <div className="font-medium text-foreground">{data?.value}</div>
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(data?.score || 0)}`}>
                              <Icon 
                                name={data?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                                size={12} 
                                className="mr-1" 
                              />
                              {data?.score}%
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Comparison Districts */}
                  {comparisonDistricts?.map((districtId) => {
                    const district = comparisonData?.[districtId];
                    return (
                      <tr key={districtId} className="hover:bg-muted/50">
                        <td className="p-4 border-b border-border">
                          <div className="flex items-center space-x-3">
                            <Icon name="MapPin" size={16} className="text-gray-500" />
                            <div>
                              <div className="font-medium text-foreground">{district?.name}</div>
                              <div className="text-xs text-text-secondary">{district?.state}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-center border-b border-border">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRankColor(district?.rank)}`}>
                            #{district?.rank}
                          </span>
                        </td>
                        {selectedMetrics?.map((metric) => {
                          const data = district?.[metric];
                          return (
                            <td key={metric} className="p-4 text-center border-b border-border">
                              <div className="space-y-1">
                                <div className="font-medium text-foreground">{data?.value}</div>
                                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(data?.score || 0)}`}>
                                  <Icon 
                                    name={data?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                                    size={12} 
                                    className="mr-1" 
                                  />
                                  {data?.score}%
                                </div>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <div className="text-sm text-text-secondary">
              Comparing {comparisonDistricts?.length + 1} districts across {selectedMetrics?.length} metrics
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                iconSize={16}
              >
                Export Report
              </Button>
              <Button
                variant="outline"
                iconName="Share2"
                iconPosition="left"
                iconSize={16}
              >
                Share Analysis
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonMatrix;