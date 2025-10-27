import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SecurityCompliance = () => {
  const [activeTab, setActiveTab] = useState('security');

  const securityFeatures = [
    {
      id: 1,
      title: "SSL/TLS Encryption",
      description: "End-to-end encryption for all data transmission using industry-standard TLS 1.3 protocol.",
      status: "active",
      icon: "Shield",
      details: "All communications between your browser and our servers are encrypted using 256-bit SSL certificates issued by trusted Certificate Authorities."
    },
    {
      id: 2,
      title: "API Authentication",
      description: "Secure OAuth 2.0 and API key-based authentication with rate limiting and access controls.",
      status: "active",
      icon: "Key",
      details: "Multi-layered authentication system with token-based access, request signing, and comprehensive audit logging."
    },
    {
      id: 3,
      title: "Data Sanitization",
      description: "Automated data cleaning and validation to prevent injection attacks and ensure data integrity.",
      status: "active",
      icon: "Filter",
      details: "Advanced input validation, SQL injection prevention, and XSS protection across all user inputs and API endpoints."
    },
    {
      id: 4,
      title: "Privacy Protection",
      description: "GDPR-compliant data handling with anonymization and pseudonymization of sensitive information.",
      status: "active",
      icon: "UserX",
      details: "Personal data is anonymized using advanced cryptographic techniques while maintaining statistical accuracy."
    },
    {
      id: 5,
      title: "Audit Logging",
      description: "Comprehensive logging of all system activities with tamper-proof audit trails.",
      status: "active",
      icon: "FileText",
      details: "Immutable audit logs track all data access, modifications, and system events with cryptographic integrity verification."
    },
    {
      id: 6,
      title: "Backup & Recovery",
      description: "Automated daily backups with point-in-time recovery and disaster recovery procedures.",
      status: "active",
      icon: "HardDrive",
      details: "Multi-region backup strategy with 99.99% data durability and Recovery Time Objective (RTO) of less than 4 hours."
    }
  ];

  const complianceStandards = [
    {
      id: 1,
      standard: "ISO 27001",
      description: "Information Security Management System certification ensuring systematic approach to managing sensitive information.",
      status: "certified",
      validUntil: "2026-03-15",
      icon: "Award"
    },
    {
      id: 2,
      standard: "SOC 2 Type II",
      description: "Service Organization Control 2 audit report demonstrating security, availability, and confidentiality controls.",
      status: "certified",
      validUntil: "2025-12-20",
      icon: "CheckCircle"
    },
    {
      id: 3,
      standard: "GDPR Compliance",
      description: "General Data Protection Regulation compliance for handling personal data of EU citizens.",
      status: "compliant",
      validUntil: "Ongoing",
      icon: "Globe"
    },
    {
      id: 4,
      standard: "Indian IT Act 2000",
      description: "Compliance with Indian Information Technology Act and associated rules for data protection.",
      status: "compliant",
      validUntil: "Ongoing",
      icon: "Flag"
    }
  ];

  const privacyPolicies = [
    {
      id: 1,
      title: "Data Collection Policy",
      description: "We collect only necessary data required for providing civic transparency services.",
      details: `Our data collection is limited to:\n• Government-provided public datasets\n• User interaction analytics (anonymized)\n• System performance metrics\n• Voluntary user feedback\n\nWe do not collect personal information without explicit consent.`
    },
    {
      id: 2,
      title: "Data Usage Policy",
      description: "Collected data is used exclusively for improving civic transparency and government accountability.",
      details: `Data usage includes:\n• Generating performance insights and visualizations\n• Improving platform functionality and user experience\n• Research and policy advocacy (with anonymized data)\n• Compliance with legal and regulatory requirements\n\nWe never sell or share personal data with third parties.`
    },
    {
      id: 3,
      title: "Data Retention Policy",
      description: "Government data is retained according to official archival policies, user data is minimized.",
      details: `Retention periods:\n• Government datasets: As per official retention schedules\n• User analytics: 24 months maximum\n• System logs: 12 months for security purposes\n• User accounts: Until deletion requested\n\nData is automatically purged after retention periods expire.`
    },
    {
      id: 4,
      title: "User Rights Policy",
      description: "Users have comprehensive rights over their personal data including access, correction, and deletion.",
      details: `Your rights include:\n• Right to access your personal data\n• Right to correct inaccurate information\n• Right to delete your account and data\n• Right to data portability\n• Right to object to processing\n\nContact our privacy team to exercise these rights.`
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': case'certified': case'compliant':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'expired':
        return 'text-error bg-error/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const tabs = [
    { id: 'security', label: 'Security Features', icon: 'Shield' },
    { id: 'compliance', label: 'Compliance', icon: 'Award' },
    { id: 'privacy', label: 'Privacy Policy', icon: 'Lock' }
  ];

  return (
    <div className="civic-card p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-3">Security & Compliance</h2>
        <p className="text-text-secondary">
          Comprehensive security measures and compliance standards ensuring data protection and user privacy.
        </p>
      </div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
        {tabs?.map((tab) => (
          <Button
            key={tab?.id}
            variant={activeTab === tab?.id ? "default" : "ghost"}
            iconName={tab?.icon}
            iconPosition="left"
            iconSize={16}
            onClick={() => setActiveTab(tab?.id)}
            className="mb-2"
          >
            {tab?.label}
          </Button>
        ))}
      </div>
      {/* Security Features Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {securityFeatures?.map((feature) => (
              <div key={feature?.id} className="bg-surface rounded-lg p-6 hover:shadow-civic-sm transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <Icon name={feature?.icon} size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{feature?.title}</h3>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full mt-1 ${getStatusColor(feature?.status)}`}>
                        <Icon name="CheckCircle" size={12} className="mr-1" />
                        <span className="text-xs font-medium capitalize">{feature?.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-text-secondary mb-3">{feature?.description}</p>
                <p className="text-xs text-text-secondary">{feature?.details}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Compliance Tab */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {complianceStandards?.map((standard) => (
              <div key={standard?.id} className="bg-surface rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mr-4">
                      <Icon name={standard?.icon} size={24} className="text-success" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{standard?.standard}</h3>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full mt-1 ${getStatusColor(standard?.status)}`}>
                        <Icon name="CheckCircle" size={12} className="mr-1" />
                        <span className="text-xs font-medium capitalize">{standard?.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-text-secondary mb-3">{standard?.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Valid Until: {standard?.validUntil}</span>
                  <Button variant="ghost" size="sm" iconName="ExternalLink" iconSize={14}>
                    View Certificate
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Compliance Summary */}
          <div className="bg-surface rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Compliance Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Icon name="Shield" size={32} className="text-success mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">100%</p>
                <p className="text-sm text-text-secondary">Security Score</p>
              </div>
              <div className="text-center">
                <Icon name="Award" size={32} className="text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-sm text-text-secondary">Certifications</p>
              </div>
              <div className="text-center">
                <Icon name="Clock" size={32} className="text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">24/7</p>
                <p className="text-sm text-text-secondary">Monitoring</p>
              </div>
              <div className="text-center">
                <Icon name="Users" size={32} className="text-secondary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-sm text-text-secondary">Breaches</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Privacy Policy Tab */}
      {activeTab === 'privacy' && (
        <div className="space-y-6">
          {privacyPolicies?.map((policy) => (
            <div key={policy?.id} className="bg-surface rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">{policy?.title}</h3>
              <p className="text-text-secondary mb-4">{policy?.description}</p>
              <div className="bg-muted rounded-lg p-4">
                <div className="prose prose-sm text-text-secondary">
                  {policy?.details?.split('\n')?.map((line, index) => (
                    <p key={index} className="mb-2">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Contact Information */}
          <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
            <div className="flex items-start">
              <Icon name="Mail" size={24} className="text-primary mr-4 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Privacy Contact</h3>
                <p className="text-text-secondary mb-4">
                  For privacy-related questions, data requests, or to exercise your rights, contact our Data Protection Officer.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="default" iconName="Mail" iconPosition="left" iconSize={16}>
                    privacy@ourvoiceourrights.gov.in
                  </Button>
                  <Button variant="outline" iconName="Phone" iconPosition="left" iconSize={16}>
                    +91-11-2345-6789
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityCompliance;