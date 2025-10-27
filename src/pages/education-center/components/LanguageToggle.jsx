import React from 'react';
import Button from '../../../components/ui/Button';


const LanguageToggle = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="flex items-center bg-surface rounded-lg p-1 border border-border">
      <Button
        variant={currentLanguage === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onLanguageChange('en')}
        className="px-3 py-1 text-sm"
      >
        English
      </Button>
      <Button
        variant={currentLanguage === 'hi' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onLanguageChange('hi')}
        className="px-3 py-1 text-sm"
      >
        हिंदी
      </Button>
    </div>
  );
};

export default LanguageToggle;