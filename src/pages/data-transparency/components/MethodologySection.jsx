import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MethodologySection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const methodologySteps = [
    {
      id: 0,
      title: "Data Collection",
      icon: "Database",
      description: "Automated daily collection from official government APIs including data.gov.in, MGNREGA portal, and state government databases.",
      details: `Our system connects to multiple government data sources through secure API endpoints. Data is collected every 24 hours at 2:00 AM IST to ensure minimal impact on source systems.\n\nValidation checks are performed during collection to identify missing or inconsistent data points. Any anomalies are flagged for manual review.`,
      techSpecs: [
        "REST API integration with OAuth 2.0 authentication",
        "Automated retry mechanism for failed requests",
        "Data validation using predefined schemas",
        "Error logging and notification system"
      ]
    },
    {
      id: 1,
      title: "Data Processing",
      icon: "Cpu",
      description: "Multi-stage data cleaning, validation, and standardization process to ensure accuracy and consistency across all datasets.",
      details: `Raw data undergoes comprehensive processing including format standardization, duplicate removal, and quality scoring.\n\nOur algorithms identify and correct common data entry errors while maintaining data integrity through audit trails.`,
      techSpecs: [
        "ETL pipeline with Apache Airflow orchestration",
        "Data quality scoring algorithms",
        "Automated anomaly detection",
        "Backup and recovery mechanisms"
      ]
    },
    {
      id: 2,
      title: "Quality Assurance",
      icon: "Shield",
      description: "Rigorous quality checks including cross-validation, statistical analysis, and manual verification of critical data points.",
      details: `Quality assurance involves both automated and manual processes. Statistical models detect outliers and inconsistencies.\n\nCritical data points are manually verified by our team of data analysts before publication.`,
      techSpecs: [
        "Statistical outlier detection algorithms",
        "Cross-reference validation with multiple sources",
        "Manual verification workflows",
        "Quality score assignment (0-100%)"
      ]
    },
    {
      id: 3,
      title: "Publication",
      icon: "Globe",
      description: "Secure publication to our platform with real-time updates, version control, and comprehensive audit logging.",
      details: `Processed data is published through our secure content delivery network with automatic caching and optimization.\n\nAll changes are tracked with complete audit trails for transparency and accountability.`,
      techSpecs: [
        "CDN distribution for global access",
        "Real-time update mechanisms",
        "Version control and rollback capabilities",
        "Comprehensive audit logging"
      ]
    }
  ];

  return (
    <div className="civic-card p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-3">Data Processing Methodology</h2>
        <p className="text-text-secondary">
          Our transparent, four-stage process ensures data accuracy, reliability, and accessibility for all citizens.
        </p>
      </div>
      {/* Step Navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        {methodologySteps?.map((step, index) => (
          <Button
            key={step?.id}
            variant={activeStep === index ? "default" : "outline"}
            size="sm"
            iconName={step?.icon}
            iconPosition="left"
            iconSize={16}
            onClick={() => setActiveStep(index)}
            className="flex-shrink-0"
          >
            {step?.title}
          </Button>
        ))}
      </div>
      {/* Active Step Content */}
      <div className="bg-surface rounded-lg p-6">
        <div className="flex items-start mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
            <Icon name={methodologySteps?.[activeStep]?.icon} size={28} className="text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {methodologySteps?.[activeStep]?.title}
            </h3>
            <p className="text-text-secondary">
              {methodologySteps?.[activeStep]?.description}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-foreground mb-3">Process Details</h4>
            <div className="prose prose-sm text-text-secondary">
              {methodologySteps?.[activeStep]?.details?.split('\n\n')?.map((paragraph, index) => (
                <p key={index} className="mb-3">{paragraph}</p>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-foreground mb-3">Technical Specifications</h4>
            <ul className="space-y-2">
              {methodologySteps?.[activeStep]?.techSpecs?.map((spec, index) => (
                <li key={index} className="flex items-start">
                  <Icon name="CheckCircle" size={16} className="text-success mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-text-secondary">{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
          <Button
            variant="outline"
            iconName="ChevronLeft"
            iconPosition="left"
            iconSize={16}
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
          >
            Previous
          </Button>
          
          <span className="text-sm text-text-secondary">
            Step {activeStep + 1} of {methodologySteps?.length}
          </span>
          
          <Button
            variant="outline"
            iconName="ChevronRight"
            iconPosition="right"
            iconSize={16}
            onClick={() => setActiveStep(Math.min(methodologySteps?.length - 1, activeStep + 1))}
            disabled={activeStep === methodologySteps?.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MethodologySection;