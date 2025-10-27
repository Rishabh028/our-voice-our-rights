import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const APIDocumentation = () => {
  const [activeEndpoint, setActiveEndpoint] = useState(0);
  const [showApiKey, setShowApiKey] = useState(false);

  const apiEndpoints = [
    {
      id: 0,
      method: "GET",
      endpoint: "/api/v1/districts",
      title: "Get All Districts",
      description: "Retrieve list of all districts with basic information and performance metrics.",
      parameters: [
        { name: "state", type: "string", required: false, description: "Filter by state code (e.g., 'UP', 'MH')" },
        { name: "limit", type: "integer", required: false, description: "Number of results (default: 50, max: 500)" },
        { name: "offset", type: "integer", required: false, description: "Pagination offset (default: 0)" }
      ],
      response: `{
  "status": "success",
  "data": [
    {
      "district_code": "UP001",
      "district_name": "Agra",
      "state_code": "UP",
      "state_name": "Uttar Pradesh",
      "performance_score": 78.5,
      "last_updated": "2025-10-25T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 750,
    "limit": 50,
    "offset": 0
  }
}`,
      rateLimit: "1000 requests/hour"
    },
    {
      id: 1,
      method: "GET",
      endpoint: "/api/v1/districts/{district_code}/performance",
      title: "District Performance Data",
      description: "Get detailed performance metrics for a specific district including MGNREGA data, employment statistics, and financial information.",
      parameters: [
        { name: "district_code", type: "string", required: true, description: "Unique district identifier (e.g., 'UP001')" },
        { name: "year", type: "integer", required: false, description: "Financial year (default: current year)" },
        { name: "month", type: "integer", required: false, description: "Specific month (1-12)" }
      ],
      response: `{
  "status": "success",
  "data": {
    "district_info": {
      "code": "UP001",
      "name": "Agra",
      "state": "Uttar Pradesh"
    },
    "performance_metrics": {
      "employment_generated": 125000,
      "funds_utilized": 45000000,
      "works_completed": 890,
      "beneficiaries": 78500
    },
    "rankings": {
      "state_rank": 12,
      "national_rank": 145
    }
  }
}`,
      rateLimit: "500 requests/hour"
    },
    {
      id: 2,
      method: "GET",
      endpoint: "/api/v1/compare",
      title: "Compare Districts",
      description: "Compare performance metrics between multiple districts with statistical analysis and rankings.",
      parameters: [
        { name: "districts", type: "array", required: true, description: "Array of district codes to compare (max: 5)" },
        { name: "metrics", type: "array", required: false, description: "Specific metrics to compare" },
        { name: "period", type: "string", required: false, description: "Time period: 'monthly', 'quarterly', 'yearly'" }
      ],
      response: `{
  "status": "success",
  "data": {
    "comparison": [
      {
        "district_code": "UP001",
        "district_name": "Agra",
        "metrics": {
          "employment_rate": 78.5,
          "fund_utilization": 92.3,
          "work_completion": 85.7
        }
      }
    ],
    "analysis": {
      "best_performer": "UP001",
      "improvement_areas": ["fund_utilization"]
    }
  }
}`,
      rateLimit: "200 requests/hour"
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
  };

  return (
    <div className="civic-card p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-3">API Documentation</h2>
        <p className="text-text-secondary mb-6">
          Access our comprehensive dataset through RESTful APIs. Perfect for researchers, developers, and civic organizations.
        </p>
        
        {/* API Key Section */}
        <div className="bg-surface rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">API Authentication</h3>
            <Button
              variant="outline"
              size="sm"
              iconName="Key"
              iconPosition="left"
              iconSize={16}
            >
              Generate API Key
            </Button>
          </div>
          <p className="text-sm text-text-secondary mb-4">
            All API requests require authentication using an API key in the request header.
          </p>
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Authorization Header:</span>
              <Button
                variant="ghost"
                size="sm"
                iconName="Copy"
                iconSize={14}
                onClick={() => copyToClipboard('Authorization: Bearer YOUR_API_KEY')}
              />
            </div>
            <code className="text-sm text-text-secondary font-mono">
              Authorization: Bearer {showApiKey ? 'ovr_live_1234567890abcdef' : '••••••••••••••••'}
            </code>
            <Button
              variant="ghost"
              size="sm"
              iconName={showApiKey ? "EyeOff" : "Eye"}
              iconSize={14}
              onClick={() => setShowApiKey(!showApiKey)}
              className="ml-2"
            />
          </div>
        </div>
      </div>
      {/* Endpoint Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {apiEndpoints?.map((endpoint, index) => (
          <Button
            key={endpoint?.id}
            variant={activeEndpoint === index ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveEndpoint(index)}
            className="flex-shrink-0"
          >
            <span className={`px-2 py-1 rounded text-xs font-mono mr-2 ${
              endpoint?.method === 'GET' ? 'bg-success text-success-foreground' : 'bg-primary text-primary-foreground'
            }`}>
              {endpoint?.method}
            </span>
            {endpoint?.title}
          </Button>
        ))}
      </div>
      {/* Active Endpoint Documentation */}
      <div className="space-y-6">
        <div className="bg-surface rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {apiEndpoints?.[activeEndpoint]?.title}
              </h3>
              <div className="flex items-center mb-3">
                <span className={`px-3 py-1 rounded text-sm font-mono mr-3 ${
                  apiEndpoints?.[activeEndpoint]?.method === 'GET' ?'bg-success text-success-foreground' :'bg-primary text-primary-foreground'
                }`}>
                  {apiEndpoints?.[activeEndpoint]?.method}
                </span>
                <code className="text-sm bg-muted px-3 py-1 rounded font-mono">
                  {apiEndpoints?.[activeEndpoint]?.endpoint}
                </code>
              </div>
              <p className="text-text-secondary">
                {apiEndpoints?.[activeEndpoint]?.description}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-secondary mb-1">Rate Limit</p>
              <p className="text-sm font-medium text-foreground">
                {apiEndpoints?.[activeEndpoint]?.rateLimit}
              </p>
            </div>
          </div>

          {/* Parameters */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-foreground mb-3">Parameters</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-medium">Name</th>
                    <th className="text-left py-2 text-foreground font-medium">Type</th>
                    <th className="text-left py-2 text-foreground font-medium">Required</th>
                    <th className="text-left py-2 text-foreground font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {apiEndpoints?.[activeEndpoint]?.parameters?.map((param, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-2 font-mono text-primary">{param?.name}</td>
                      <td className="py-2 text-text-secondary">{param?.type}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          param?.required 
                            ? 'bg-error/10 text-error' :'bg-muted text-text-secondary'
                        }`}>
                          {param?.required ? 'Required' : 'Optional'}
                        </span>
                      </td>
                      <td className="py-2 text-text-secondary">{param?.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Response Example */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-medium text-foreground">Response Example</h4>
              <Button
                variant="ghost"
                size="sm"
                iconName="Copy"
                iconSize={14}
                onClick={() => copyToClipboard(apiEndpoints?.[activeEndpoint]?.response)}
              >
                Copy
              </Button>
            </div>
            <div className="bg-muted rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                {apiEndpoints?.[activeEndpoint]?.response}
              </pre>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="civic-card p-4">
            <Icon name="Book" size={24} className="text-primary mb-3" />
            <h4 className="font-semibold text-foreground mb-2">SDK Libraries</h4>
            <p className="text-sm text-text-secondary mb-3">
              Official SDKs for Python, JavaScript, and R
            </p>
            <Button variant="outline" size="sm" fullWidth>
              Download SDKs
            </Button>
          </div>
          
          <div className="civic-card p-4">
            <Icon name="MessageSquare" size={24} className="text-primary mb-3" />
            <h4 className="font-semibold text-foreground mb-2">Developer Support</h4>
            <p className="text-sm text-text-secondary mb-3">
              Community forum and technical support
            </p>
            <Button variant="outline" size="sm" fullWidth>
              Join Community
            </Button>
          </div>
          
          <div className="civic-card p-4">
            <Icon name="Zap" size={24} className="text-primary mb-3" />
            <h4 className="font-semibold text-foreground mb-2">API Status</h4>
            <p className="text-sm text-text-secondary mb-3">
              Real-time API health and uptime monitoring
            </p>
            <Button variant="outline" size="sm" fullWidth>
              View Status
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIDocumentation;