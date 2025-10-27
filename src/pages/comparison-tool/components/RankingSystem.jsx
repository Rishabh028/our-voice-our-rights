import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const RankingSystem = () => {
  const [selectedMetric, setSelectedMetric] = useState('overall');
  const [selectedState, setSelectedState] = useState('maharashtra');
  const [viewType, setViewType] = useState('top10');

  const metricOptions = [
  { value: 'overall', label: 'Overall Performance' },
  { value: 'employment', label: 'Employment Generation' },
  { value: 'wages', label: 'Wage Distribution' },
  { value: 'completion', label: 'Work Completion Rate' },
  { value: 'transparency', label: 'Transparency Index' },
  { value: 'participation', label: 'Women Participation' }];


  const stateOptions = [
  { value: 'maharashtra', label: 'Maharashtra' },
  { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
  { value: 'rajasthan', label: 'Rajasthan' },
  { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
  { value: 'west-bengal', label: 'West Bengal' }];


  const viewTypeOptions = [
  { value: 'top10', label: 'Top 10 Districts' },
  { value: 'bottom10', label: 'Bottom 10 Districts' },
  { value: 'all', label: 'All Districts' }];


  // Mock ranking data
  const rankingData = [
  {
    rank: 1,
    district: 'Pune',
    state: 'Maharashtra',
    score: 92.5,
    change: '+2',
    trend: 'up',
    jobCards: 125420,
    employment: 3.2,
    wages: 642.7,
    completion: 89.2,
    image: "https://images.unsplash.com/photo-1506092198436-9c26f62f0df9",
    imageAlt: 'Aerial view of modern Pune cityscape with green spaces and urban development'
  },
  {
    rank: 2,
    district: 'Nashik',
    state: 'Maharashtra',
    score: 89.8,
    change: '+1',
    trend: 'up',
    jobCards: 98750,
    employment: 2.8,
    wages: 578.3,
    completion: 87.5,
    image: "https://images.unsplash.com/photo-1690885345559-f0e00b3f5a95",
    imageAlt: 'Nashik district rural landscape with agricultural fields and farming activities'
  },
  {
    rank: 3,
    district: 'Nagpur',
    state: 'Maharashtra',
    score: 87.2,
    change: '-1',
    trend: 'down',
    jobCards: 87650,
    employment: 2.6,
    wages: 523.8,
    completion: 85.1,
    image: "https://images.unsplash.com/photo-1615106858697-2946ed44c00c",
    imageAlt: 'Nagpur district showing mix of urban infrastructure and rural development projects'
  },
  {
    rank: 4,
    district: 'Aurangabad',
    state: 'Maharashtra',
    score: 84.6,
    change: '0',
    trend: 'stable',
    jobCards: 76420,
    employment: 2.4,
    wages: 487.2,
    completion: 82.8,
    image: "https://images.unsplash.com/photo-1719151024448-f6d1a58e3fdf",
    imageAlt: 'Aurangabad district rural area with MGNREGA work site and community participation'
  },
  {
    rank: 5,
    district: 'Solapur',
    state: 'Maharashtra',
    score: 82.1,
    change: '+3',
    trend: 'up',
    jobCards: 69850,
    employment: 2.2,
    wages: 445.6,
    completion: 80.3,
    image: "https://images.unsplash.com/photo-1615106858697-2946ed44c00c",
    imageAlt: 'Solapur district showing agricultural development and rural infrastructure projects'
  },
  {
    rank: 6,
    district: 'Kolhapur',
    state: 'Maharashtra',
    score: 79.8,
    change: '-2',
    trend: 'down',
    jobCards: 64230,
    employment: 2.0,
    wages: 412.3,
    completion: 78.9,
    image: "https://images.unsplash.com/photo-1721640692267-45625ca0f5f6",
    imageAlt: 'Kolhapur district rural landscape with water conservation and agricultural activities'
  },
  {
    rank: 7,
    district: 'Sangli',
    state: 'Maharashtra',
    score: 77.5,
    change: '+1',
    trend: 'up',
    jobCards: 58940,
    employment: 1.9,
    wages: 389.7,
    completion: 76.2,
    image: "https://images.unsplash.com/photo-1615106858697-2946ed44c00c",
    imageAlt: 'Sangli district showing rural development work and community engagement programs'
  },
  {
    rank: 8,
    district: 'Ahmednagar',
    state: 'Maharashtra',
    score: 75.2,
    change: '-1',
    trend: 'down',
    jobCards: 55670,
    employment: 1.8,
    wages: 367.4,
    completion: 74.6,
    image: "https://images.unsplash.com/photo-1615106858697-2946ed44c00c",
    imageAlt: 'Ahmednagar district rural area with ongoing infrastructure development projects'
  },
  {
    rank: 9,
    district: 'Jalgaon',
    state: 'Maharashtra',
    score: 72.9,
    change: '0',
    trend: 'stable',
    jobCards: 52340,
    employment: 1.7,
    wages: 345.8,
    completion: 72.1,
    image: "https://images.unsplash.com/photo-1719151024293-e255508f4649",
    imageAlt: 'Jalgaon district agricultural landscape with rural employment generation activities'
  },
  {
    rank: 10,
    district: 'Dhule',
    state: 'Maharashtra',
    score: 70.6,
    change: '+2',
    trend: 'up',
    jobCards: 48920,
    employment: 1.6,
    wages: 324.2,
    completion: 69.8,
    image: "https://images.unsplash.com/photo-1656646499120-31a5fec70c80",
    imageAlt: 'Dhule district rural development site with community participation and skill development'
  }];


  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return { icon: 'TrendingUp', color: 'text-accent' };
      case 'down':
        return { icon: 'TrendingDown', color: 'text-error' };
      default:
        return { icon: 'Minus', color: 'text-text-secondary' };
    }
  };

  const getChangeColor = (change) => {
    if (change?.startsWith('+')) return 'text-accent';
    if (change?.startsWith('-')) return 'text-error';
    return 'text-text-secondary';
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-civic-elevation">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mr-3">
            <Icon name="Trophy" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">District Rankings</h2>
            <p className="text-sm text-text-secondary">Performance rankings across districts</p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Ranking Metric"
            options={metricOptions}
            value={selectedMetric}
            onChange={setSelectedMetric} />

          
          <Select
            label="State"
            options={stateOptions}
            value={selectedState}
            onChange={setSelectedState} />

          
          <Select
            label="View"
            options={viewTypeOptions}
            value={viewType}
            onChange={setViewType} />

        </div>
      </div>
      {/* Rankings List */}
      <div className="p-6">
        <div className="space-y-4">
          {rankingData?.map((district) => {
            const trendInfo = getTrendIcon(district?.trend);
            return (
              <div
                key={district?.rank}
                className="bg-surface rounded-lg border border-border p-4 hover:shadow-civic-sm transition-shadow duration-200">

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Rank Badge */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${
                    district?.rank <= 3 ?
                    'bg-accent text-accent-foreground' :
                    'bg-muted text-muted-foreground'}`
                    }>
                      {district?.rank}
                    </div>

                    {/* District Image */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <img
                        src={district?.image}
                        alt={district?.imageAlt}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/assets/images/no_image.png';
                        }} />

                    </div>

                    {/* District Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{district?.district}</h3>
                      <p className="text-sm text-text-secondary">{district?.state}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-lg font-bold text-primary mr-2">{district?.score}</span>
                        <div className="flex items-center">
                          <Icon name={trendInfo?.icon} size={16} className={trendInfo?.color} />
                          <span className={`text-sm ml-1 ${getChangeColor(district?.change)}`}>
                            {district?.change !== '0' ? district?.change : 'No change'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="hidden lg:flex space-x-8">
                    <div className="text-center">
                      <p className="text-xs text-text-secondary">Job Cards</p>
                      <p className="font-semibold text-foreground">{district?.jobCards?.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-text-secondary">Employment</p>
                      <p className="font-semibold text-foreground">{district?.employment}M</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-text-secondary">Wages</p>
                      <p className="font-semibold text-foreground">₹{district?.wages}Cr</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-text-secondary">Completion</p>
                      <p className="font-semibold text-foreground">{district?.completion}%</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="right"
                    iconSize={14}>

                    View Details
                  </Button>
                </div>
                {/* Mobile Metrics */}
                <div className="lg:hidden mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-xs text-text-secondary">Job Cards</p>
                      <p className="font-semibold text-foreground">{district?.jobCards?.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-text-secondary">Employment</p>
                      <p className="font-semibold text-foreground">{district?.employment}M person-days</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-text-secondary">Wages</p>
                      <p className="font-semibold text-foreground">₹{district?.wages} Crores</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-text-secondary">Completion</p>
                      <p className="font-semibold text-foreground">{district?.completion}%</p>
                    </div>
                  </div>
                </div>
              </div>);

          })}
        </div>

        {/* Load More */}
        <div className="text-center mt-6">
          <Button
            variant="outline"
            iconName="ChevronDown"
            iconPosition="right"
            iconSize={16}>

            Load More Districts
          </Button>
        </div>
      </div>
    </div>);

};

export default RankingSystem;