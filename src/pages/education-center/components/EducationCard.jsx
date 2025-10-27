import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const EducationCard = ({ 
  title, 
  description, 
  icon, 
  image, 
  imageAlt, 
  progress, 
  duration, 
  difficulty, 
  onStart, 
  isCompleted = false,
  currentLanguage 
}) => {
  const difficultyColors = {
    beginner: 'text-green-600 bg-green-50',
    intermediate: 'text-yellow-600 bg-yellow-50',
    advanced: 'text-red-600 bg-red-50'
  };

  const difficultyLabels = {
    en: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
    hi: { beginner: 'शुरुआती', intermediate: 'मध्यम', advanced: 'उन्नत' }
  };

  const buttonText = {
    en: { start: 'Start Learning', continue: 'Continue', completed: 'Completed' },
    hi: { start: 'सीखना शुरू करें', continue: 'जारी रखें', completed: 'पूर्ण' }
  };

  return (
    <div className="civic-card p-6 hover:shadow-civic-elevation transition-all duration-300">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {image ? (
            <div className="w-16 h-16 rounded-lg overflow-hidden">
              <Image 
                src={image} 
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={icon} size={24} className="text-primary" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground line-clamp-2">
              {title}
            </h3>
            {isCompleted && (
              <div className="flex-shrink-0 ml-2">
                <Icon name="CheckCircle" size={20} className="text-green-600" />
              </div>
            )}
          </div>
          
          <p className="text-text-secondary text-sm mb-4 line-clamp-3">
            {description}
          </p>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center text-sm text-text-secondary">
              <Icon name="Clock" size={16} className="mr-1" />
              {duration}
            </div>
            
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors?.[difficulty]}`}>
              {difficultyLabels?.[currentLanguage]?.[difficulty]}
            </span>
          </div>
          
          {progress !== undefined && progress > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-text-secondary">
                  {currentLanguage === 'en' ? 'Progress' : 'प्रगति'}
                </span>
                <span className="text-foreground font-medium">{progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
          
          <Button
            variant={isCompleted ? "outline" : "default"}
            onClick={onStart}
            iconName={isCompleted ? "CheckCircle" : "Play"}
            iconPosition="left"
            iconSize={16}
            className="w-full sm:w-auto"
          >
            {isCompleted 
              ? buttonText?.[currentLanguage]?.completed
              : progress > 0 
                ? buttonText?.[currentLanguage]?.continue
                : buttonText?.[currentLanguage]?.start
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;