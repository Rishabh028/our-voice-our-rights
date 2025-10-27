import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ExportTools = ({ comparisonData, isOpen, onToggle }) => {
  const [exportSettings, setExportSettings] = useState({
    format: 'pdf',
    includeCharts: true,
    includeRawData: false,
    includeInsights: true,
    includeTrends: true,
    customTitle: '',
    addWatermark: true,
    includeMethodology: false
  });

  const formatOptions = [
    { value: 'pdf', label: 'PDF Report' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV Data' },
    { value: 'json', label: 'JSON Data' },
    { value: 'png', label: 'PNG Images' }
  ];

  const handleSettingChange = (key, value) => {
    setExportSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting with settings:', exportSettings);
    
    // Simulate export process
    const exportData = {
      ...comparisonData,
      settings: exportSettings,
      timestamp: new Date()?.toISOString(),
      generatedBy: 'Our Voice Our Rights Platform'
    };

    // In a real implementation, this would trigger the actual export
    alert(`Export initiated! Format: ${exportSettings?.format?.toUpperCase()}\nCheck your downloads folder in a few moments.`);
    
    onToggle();
  };

  const getEstimatedFileSize = () => {
    let size = 0.5; // Base size in MB
    
    if (exportSettings?.includeCharts) size += 2;
    if (exportSettings?.includeRawData) size += 1.5;
    if (exportSettings?.includeTrends) size += 1;
    if (exportSettings?.includeMethodology) size += 0.5;
    
    if (exportSettings?.format === 'excel') size *= 0.8;
    if (exportSettings?.format === 'csv') size *= 0.3;
    if (exportSettings?.format === 'json') size *= 0.4;
    if (exportSettings?.format === 'png') size *= 1.5;
    
    return size?.toFixed(1);
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        onClick={onToggle}
        iconName="Download"
        iconPosition="left"
        iconSize={18}
        disabled={!comparisonData}
      >
        Export Report
      </Button>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border shadow-civic-elevation">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Icon name="Download" size={20} className="text-primary mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">Export Report</h3>
              <p className="text-sm text-text-secondary">Customize and download your comparison report</p>
            </div>
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
        {/* Export Format */}
        <div>
          <Select
            label="Export Format"
            description="Choose the format for your exported report"
            options={formatOptions}
            value={exportSettings?.format}
            onChange={(value) => handleSettingChange('format', value)}
          />
        </div>

        {/* Custom Title */}
        <div>
          <Input
            label="Custom Report Title"
            type="text"
            placeholder="Enter a custom title for your report"
            value={exportSettings?.customTitle}
            onChange={(e) => handleSettingChange('customTitle', e?.target?.value)}
            description="Leave blank to use default title"
          />
        </div>

        {/* Content Options */}
        <div>
          <h4 className="text-md font-medium text-foreground mb-4">Content Options</h4>
          <div className="space-y-3">
            <Checkbox
              label="Include Charts and Visualizations"
              checked={exportSettings?.includeCharts}
              onChange={(e) => handleSettingChange('includeCharts', e?.target?.checked)}
              description="Add all comparison charts and graphs to the report"
            />
            
            <Checkbox
              label="Include Raw Data Tables"
              checked={exportSettings?.includeRawData}
              onChange={(e) => handleSettingChange('includeRawData', e?.target?.checked)}
              description="Include detailed data tables with all metrics"
            />
            
            <Checkbox
              label="Include Insights and Recommendations"
              checked={exportSettings?.includeInsights}
              onChange={(e) => handleSettingChange('includeInsights', e?.target?.checked)}
              description="Add AI-generated insights and improvement recommendations"
            />
            
            <Checkbox
              label="Include Trend Analysis"
              checked={exportSettings?.includeTrends}
              onChange={(e) => handleSettingChange('includeTrends', e?.target?.checked)}
              description="Add historical trends and projections"
            />
            
            <Checkbox
              label="Include Methodology Notes"
              checked={exportSettings?.includeMethodology}
              onChange={(e) => handleSettingChange('includeMethodology', e?.target?.checked)}
              description="Add explanation of data sources and calculation methods"
            />
          </div>
        </div>

        {/* Additional Options */}
        <div>
          <h4 className="text-md font-medium text-foreground mb-4">Additional Options</h4>
          <div className="space-y-3">
            <Checkbox
              label="Add Platform Watermark"
              checked={exportSettings?.addWatermark}
              onChange={(e) => handleSettingChange('addWatermark', e?.target?.checked)}
              description="Include 'Our Voice Our Rights' branding on the report"
            />
          </div>
        </div>

        {/* Export Preview */}
        <div className="bg-surface rounded-lg p-4 border border-border">
          <h4 className="text-md font-medium text-foreground mb-3">Export Preview</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Format:</span>
              <span className="font-medium text-foreground">{exportSettings?.format?.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Estimated Size:</span>
              <span className="font-medium text-foreground">{getEstimatedFileSize()} MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Generated:</span>
              <span className="font-medium text-foreground">{new Date()?.toLocaleDateString('en-IN')}</span>
            </div>
            {comparisonData && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Comparison:</span>
                <span className="font-medium text-foreground">
                  {comparisonData?.district1?.charAt(0)?.toUpperCase() + comparisonData?.district1?.slice(1)} vs {comparisonData?.district2?.charAt(0)?.toUpperCase() + comparisonData?.district2?.slice(1)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            variant="default"
            onClick={handleExport}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
            className="flex-1"
            disabled={!comparisonData}
          >
            Generate & Download Report
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {
              // Mock API access
              console.log('Opening API documentation');
              window.open('/api-docs', '_blank');
            }}
            iconName="Code"
            iconPosition="left"
            iconSize={16}
          >
            API Access
          </Button>
        </div>

        {/* API Information */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start">
            <Icon name="Info" size={16} className="text-primary mr-2 mt-0.5" />
            <div className="text-sm">
              <p className="text-foreground font-medium mb-1">Developer API Available</p>
              <p className="text-text-secondary">
                Access raw data programmatically through our REST API. Perfect for researchers, NGOs, and civic tech developers building custom analysis tools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportTools;