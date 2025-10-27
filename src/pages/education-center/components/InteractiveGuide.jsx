import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const InteractiveGuide = ({ currentLanguage }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const guides = {
    en: {
      title: 'How to Apply for MGNREGA Work',
      description: 'Step-by-step guide to register and get work under MGNREGA',
      steps: [
      {
        title: 'Visit Gram Panchayat Office',
        description: 'Go to your local Gram Panchayat office with required documents',
        image: "https://images.unsplash.com/photo-1717127280237-d6bea1717e14",
        imageAlt: 'Government office building with people waiting outside',
        details: `Bring the following documents:\n• Aadhaar Card\n• Ration Card\n• Bank Account Details\n• Passport Size Photos`,
        icon: 'Building'
      },
      {
        title: 'Fill Application Form',
        description: 'Complete the job card application form with accurate information',
        image: "https://images.unsplash.com/photo-1573146179771-d58c297104a2",
        imageAlt: 'Person filling out application form at desk with pen',
        details: `Information required:\n• Personal details of all adult family members\n• Address proof\n• Bank account information\n• Contact details`,
        icon: 'FileText'
      },
      {
        title: 'Submit Documents',
        description: 'Submit your application along with required documents',
        image: "https://images.unsplash.com/photo-1654685657658-bd025d75b6a1",
        imageAlt: 'Hands submitting documents to government official at counter',
        details: `Documents to submit:\n• Completed application form\n• Photocopies of all documents\n• Passport size photographs\n• Bank passbook copy`,
        icon: 'Upload'
      },
      {
        title: 'Receive Job Card',
        description: 'Get your MGNREGA job card within 15 days of application',
        image: "https://images.unsplash.com/photo-1730130596440-e9925840f028",
        imageAlt: 'Happy family holding official MGNREGA job card document',
        details: `Your job card will contain:\n• Unique job card number\n• Photos of all registered members\n• Work history and payments\n• Valid for entire family`,
        icon: 'CreditCard'
      },
      {
        title: 'Apply for Work',
        description: 'Request work by submitting written application',
        image: "https://images.unsplash.com/photo-1582212827346-330d74c9e493",
        imageAlt: 'Group of workers with tools ready for MGNREGA construction work',
        details: `Work application process:\n• Submit written request for work\n• Work must be provided within 15 days\n• Minimum 14 days of work guaranteed\n• Equal wages for men and women`,
        icon: 'Briefcase'
      }]

    },
    hi: {
      title: 'मनरेगा कार्य के लिए आवेदन कैसे करें',
      description: 'मनरेगा के तहत पंजीकरण और कार्य प्राप्त करने के लिए चरणबद्ध गाइड',
      steps: [
      {
        title: 'ग्राम पंचायत कार्यालय जाएं',
        description: 'आवश्यक दस्तावेजों के साथ अपने स्थानीय ग्राम पंचायत कार्यालय जाएं',
        image: "https://images.unsplash.com/photo-1551792588-fe673ede1042",
        imageAlt: 'सरकारी कार्यालय भवन जहाँ लोग बाहर प्रतीक्षा कर रहे हैं',
        details: `निम्नलिखित दस्तावेज लाएं:\n• आधार कार्ड\n• राशन कार्ड\n• बैंक खाता विवरण\n• पासपोर्ट साइज फोटो`,
        icon: 'Building'
      },
      {
        title: 'आवेदन फॉर्म भरें',
        description: 'सटीक जानकारी के साथ जॉब कार्ड आवेदन फॉर्म पूरा करें',
        image: "https://images.unsplash.com/photo-1573146179771-d58c297104a2",
        imageAlt: 'व्यक्ति मेज पर कलम से आवेदन फॉर्म भर रहा है',
        details: `आवश्यक जानकारी:\n• सभी वयस्क परिवारजनों का विवरण\n• पता प्रमाण\n• बैंक खाता जानकारी\n• संपर्क विवरण`,
        icon: 'FileText'
      },
      {
        title: 'दस्तावेज जमा करें',
        description: 'आवश्यक दस्तावेजों के साथ अपना आवेदन जमा करें',
        image: "https://images.unsplash.com/photo-1542868727-a1fc9a8a0ab8",
        imageAlt: 'काउंटर पर सरकारी अधिकारी को दस्तावेज जमा करते हाथ',
        details: `जमा करने वाले दस्तावेज:\n• भरा हुआ आवेदन फॉर्म\n• सभी दस्तावेजों की फोटोकॉपी\n• पासपोर्ट साइज फोटोग्राफ\n• बैंक पासबुक की कॉपी`,
        icon: 'Upload'
      },
      {
        title: 'जॉब कार्ड प्राप्त करें',
        description: 'आवेदन के 15 दिन के भीतर अपना मनरेगा जॉब कार्ड प्राप्त करें',
        image: "https://images.unsplash.com/photo-1631944292612-a84aa9b3a200",
        imageAlt: 'खुश परिवार आधिकारिक मनरेगा जॉब कार्ड दस्तावेज पकड़े हुए',
        details: `आपके जॉब कार्ड में होगा:\n• अनूठा जॉब कार्ड नंबर\n• सभी पंजीकृत सदस्यों की फोटो\n• कार्य इतिहास और भुगतान\n• पूरे परिवार के लिए वैध`,
        icon: 'CreditCard'
      },
      {
        title: 'कार्य के लिए आवेदन करें',
        description: 'लिखित आवेदन जमा करके कार्य का अनुरोध करें',
        image: "https://images.unsplash.com/photo-1733117439343-54bdb6e1bf7b",
        imageAlt: 'मनरेगा निर्माण कार्य के लिए उपकरणों के साथ तैयार श्रमिकों का समूह',
        details: `कार्य आवेदन प्रक्रिया:\n• कार्य के लिए लिखित अनुरोध जमा करें\n• 15 दिन के भीतर कार्य प्रदान किया जाना चाहिए\n• न्यूनतम 14 दिन का कार्य गारंटीशुदा\n• पुरुष और महिला के लिए समान मजदूरी`,
        icon: 'Briefcase'
      }]

    }
  };

  const currentGuide = guides?.[currentLanguage];
  const totalSteps = currentGuide?.steps?.length;

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const labels = {
    en: { previous: 'Previous', next: 'Next', stepOf: 'Step {current} of {total}' },
    hi: { previous: 'पिछला', next: 'अगला', stepOf: 'चरण {current} का {total}' }
  };

  return (
    <div className="civic-card p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {currentGuide?.title}
        </h3>
        <p className="text-text-secondary">
          {currentGuide?.description}
        </p>
      </div>
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-text-secondary">
            {labels?.[currentLanguage]?.stepOf?.replace('{current}', currentStep + 1)?.replace('{total}', totalSteps)}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round((currentStep + 1) / totalSteps * 100)}%
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep + 1) / totalSteps * 100}%` }} />

        </div>
        
        <div className="flex justify-between mt-2">
          {currentGuide?.steps?.map((_, index) =>
          <button
            key={index}
            onClick={() => goToStep(index)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
            index <= currentStep ?
            'bg-primary text-primary-foreground' :
            'bg-muted text-text-secondary hover:bg-border'}`
            }>

              {index + 1}
            </button>
          )}
        </div>
      </div>
      {/* Current Step Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={currentGuide?.steps?.[currentStep]?.icon} size={24} className="text-primary" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-2">
                {currentGuide?.steps?.[currentStep]?.title}
              </h4>
              <p className="text-text-secondary">
                {currentGuide?.steps?.[currentStep]?.description}
              </p>
            </div>
          </div>
          
          <div className="bg-surface rounded-lg p-4 border border-border">
            <h5 className="font-medium text-foreground mb-3 flex items-center">
              <Icon name="Info" size={16} className="mr-2" />
              {currentLanguage === 'en' ? 'Important Details' : 'महत्वपूर्ण विवरण'}
            </h5>
            <div className="text-sm text-text-secondary whitespace-pre-line">
              {currentGuide?.steps?.[currentStep]?.details}
            </div>
          </div>
        </div>
        
        <div className="aspect-video rounded-lg overflow-hidden">
          <Image
            src={currentGuide?.steps?.[currentStep]?.image}
            alt={currentGuide?.steps?.[currentStep]?.imageAlt}
            className="w-full h-full object-cover" />

        </div>
      </div>
      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          iconName="ChevronLeft"
          iconPosition="left"
          iconSize={16}>

          {labels?.[currentLanguage]?.previous}
        </Button>
        
        <div className="flex space-x-2">
          {currentGuide?.steps?.map((_, index) =>
          <button
            key={index}
            onClick={() => goToStep(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
            index === currentStep ? 'bg-primary' : 'bg-muted hover:bg-border'}`
            } />

          )}
        </div>
        
        <Button
          variant="default"
          onClick={nextStep}
          disabled={currentStep === totalSteps - 1}
          iconName="ChevronRight"
          iconPosition="right"
          iconSize={16}>

          {labels?.[currentLanguage]?.next}
        </Button>
      </div>
    </div>);

};

export default InteractiveGuide;