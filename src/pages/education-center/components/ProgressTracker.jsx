import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressTracker = ({ currentLanguage }) => {
  const mockProgress = [
    {
      id: 1,
      title: currentLanguage === 'en' ? 'MGNREGA Basics' : 'मनरेगा मूल बातें',
      completed: true,
      progress: 100,
      modules: 5,
      completedModules: 5,
      timeSpent: '2h 30m',
      certificate: true
    },
    {
      id: 2,
      title: currentLanguage === 'en' ? 'Application Process' : 'आवेदन प्रक्रिया',
      completed: false,
      progress: 60,
      modules: 4,
      completedModules: 2,
      timeSpent: '1h 15m',
      certificate: false
    },
    {
      id: 3,
      title: currentLanguage === 'en' ? 'Rights & Benefits' : 'अधिकार और लाभ',
      completed: false,
      progress: 25,
      modules: 6,
      completedModules: 1,
      timeSpent: '45m',
      certificate: false
    },
    {
      id: 4,
      title: currentLanguage === 'en' ? 'Complaint Process' : 'शिकायत प्रक्रिया',
      completed: false,
      progress: 0,
      modules: 3,
      completedModules: 0,
      timeSpent: '0m',
      certificate: false
    }
  ];

  const labels = {
    en: {
      title: 'Your Learning Progress',
      description: 'Track your educational journey and achievements',
      modules: 'modules',
      timeSpent: 'Time Spent',
      continue: 'Continue Learning',
      start: 'Start Course',
      completed: 'Completed',
      certificate: 'Download Certificate',
      overallProgress: 'Overall Progress',
      totalTime: 'Total Learning Time',
      certificatesEarned: 'Certificates Earned'
    },
    hi: {
      title: 'आपकी शिक्षा प्रगति',
      description: 'अपनी शैक्षिक यात्रा और उपलब्धियों को ट्रैक करें',
      modules: 'मॉड्यूल',
      timeSpent: 'समय व्यतीत',
      continue: 'सीखना जारी रखें',
      start: 'कोर्स शुरू करें',
      completed: 'पूर्ण',
      certificate: 'प्रमाणपत्र डाउनलोड करें',
      overallProgress: 'समग्र प्रगति',
      totalTime: 'कुल सीखने का समय',
      certificatesEarned: 'अर्जित प्रमाणपत्र'
    }
  };

  const calculateOverallProgress = () => {
    const totalProgress = mockProgress?.reduce((sum, course) => sum + course?.progress, 0);
    return Math.round(totalProgress / mockProgress?.length);
  };

  const getTotalTime = () => {
    const totalMinutes = mockProgress?.reduce((sum, course) => {
      const time = course?.timeSpent;
      const hours = parseInt(time?.split('h')?.[0]) || 0;
      const minutes = parseInt(time?.split('h')?.[1]?.split('m')?.[0]) || parseInt(time?.split('m')?.[0]) || 0;
      return sum + (hours * 60) + minutes;
    }, 0);
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const getCertificatesCount = () => {
    return mockProgress?.filter(course => course?.certificate)?.length;
  };

  return (
    <div className="civic-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {labels?.[currentLanguage]?.title}
          </h3>
          <p className="text-text-secondary text-sm">
            {labels?.[currentLanguage]?.description}
          </p>
        </div>
        
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="TrendingUp" size={24} className="text-primary" />
        </div>
      </div>
      {/* Overall Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-surface rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">{labels?.[currentLanguage]?.overallProgress}</span>
            <Icon name="BarChart3" size={16} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">
            {calculateOverallProgress()}%
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${calculateOverallProgress()}%` }}
            />
          </div>
        </div>
        
        <div className="bg-surface rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">{labels?.[currentLanguage]?.totalTime}</span>
            <Icon name="Clock" size={16} className="text-accent" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            {getTotalTime()}
          </div>
        </div>
        
        <div className="bg-surface rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">{labels?.[currentLanguage]?.certificatesEarned}</span>
            <Icon name="Award" size={16} className="text-secondary" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            {getCertificatesCount()}
          </div>
        </div>
      </div>
      {/* Course Progress List */}
      <div className="space-y-4">
        {mockProgress?.map((course) => (
          <div key={course?.id} className="bg-surface rounded-lg p-4 border border-border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">
                  {course?.title}
                </h4>
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <span>
                    {course?.completedModules}/{course?.modules} {labels?.[currentLanguage]?.modules}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Clock" size={14} className="mr-1" />
                    {course?.timeSpent}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {course?.completed && (
                  <Icon name="CheckCircle" size={20} className="text-green-600" />
                )}
                {course?.certificate && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    iconSize={14}
                    onClick={() => console.log('Download certificate for:', course?.title)}
                  >
                    {labels?.[currentLanguage]?.certificate}
                  </Button>
                )}
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-text-secondary">
                  {labels?.[currentLanguage]?.overallProgress}
                </span>
                <span className="font-medium text-foreground">
                  {course?.progress}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    course?.completed ? 'bg-green-600' : 'bg-primary'
                  }`}
                  style={{ width: `${course?.progress}%` }}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                variant={course?.completed ? "outline" : "default"}
                size="sm"
                iconName={course?.completed ? "CheckCircle" : course?.progress > 0 ? "Play" : "BookOpen"}
                iconPosition="left"
                iconSize={16}
                onClick={() => console.log('Navigate to course:', course?.title)}
              >
                {course?.completed 
                  ? labels?.[currentLanguage]?.completed
                  : course?.progress > 0 
                    ? labels?.[currentLanguage]?.continue
                    : labels?.[currentLanguage]?.start
                }
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;