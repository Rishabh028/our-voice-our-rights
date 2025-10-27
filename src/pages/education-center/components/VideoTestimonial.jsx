import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const VideoTestimonial = ({ 
  name, 
  location, 
  avatar, 
  avatarAlt, 
  thumbnail, 
  thumbnailAlt, 
  testimonial, 
  videoUrl, 
  duration,
  currentLanguage 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    // In a real implementation, this would trigger video playback
    console.log('Playing video:', videoUrl);
  };

  const labels = {
    en: { 
      watchVideo: 'Watch Video',
      testimonial: 'Testimonial',
      beneficiary: 'MGNREGA Beneficiary'
    },
    hi: { 
      watchVideo: 'वीडियो देखें',
      testimonial: 'प्रशंसापत्र',
      beneficiary: 'मनरेगा लाभार्थी'
    }
  };

  return (
    <div className="civic-card p-6">
      <div className="relative mb-4">
        <div className="aspect-video rounded-lg overflow-hidden bg-muted">
          <Image 
            src={thumbnail} 
            alt={thumbnailAlt}
            className="w-full h-full object-cover"
          />
          
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <button
                onClick={handlePlay}
                className="w-16 h-16 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors duration-200 shadow-civic-lg"
              >
                <Icon name="Play" size={24} className="text-primary-foreground ml-1" />
              </button>
            </div>
          )}
        </div>
        
        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {duration}
        </div>
      </div>
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image 
            src={avatar} 
            alt={avatarAlt}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground">{name}</h4>
          <p className="text-sm text-text-secondary">{labels?.[currentLanguage]?.beneficiary}</p>
          <p className="text-sm text-text-secondary flex items-center">
            <Icon name="MapPin" size={14} className="mr-1" />
            {location}
          </p>
        </div>
      </div>
      <blockquote className="text-text-secondary italic mb-4 line-clamp-4">
        "{testimonial}"
      </blockquote>
      <button
        onClick={handlePlay}
        className="flex items-center text-primary hover:text-primary/80 transition-colors duration-200 text-sm font-medium"
      >
        <Icon name="Play" size={16} className="mr-2" />
        {labels?.[currentLanguage]?.watchVideo}
      </button>
    </div>
  );
};

export default VideoTestimonial;