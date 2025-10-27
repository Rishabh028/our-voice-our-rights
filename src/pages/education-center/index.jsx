import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import LanguageToggle from './components/LanguageToggle';
import EducationCard from './components/EducationCard';
import VideoTestimonial from './components/VideoTestimonial';
import BenefitCalculator from './components/BenefitCalculator';
import InteractiveGuide from './components/InteractiveGuide';
import ProgressTracker from './components/ProgressTracker';

const EducationCenter = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferredLanguage', language);
  };

  const content = {
    en: {
      title: 'MGNREGA Education Center',
      subtitle: 'Learn about your rights, benefits, and how to access MGNREGA services',
      searchPlaceholder: 'Search educational content...',
      categories: {
        all: 'All Topics',
        basics: 'MGNREGA Basics',
        application: 'Application Process',
        rights: 'Rights & Benefits',
        complaints: 'Complaints & Grievances'
      },
      sections: {
        courses: 'Educational Courses',
        testimonials: 'Success Stories',
        calculator: 'Benefit Calculator',
        guide: 'Interactive Guide',
        progress: 'Your Progress'
      }
    },
    hi: {
      title: 'मनरेगा शिक्षा केंद्र',
      subtitle: 'अपने अधिकारों, लाभों और मनरेगा सेवाओं तक पहुंचने के बारे में जानें',
      searchPlaceholder: 'शैक्षिक सामग्री खोजें...',
      categories: {
        all: 'सभी विषय',
        basics: 'मनरेगा मूल बातें',
        application: 'आवेदन प्रक्रिया',
        rights: 'अधिकार और लाभ',
        complaints: 'शिकायत और समस्याएं'
      },
      sections: {
        courses: 'शैक्षिक पाठ्यक्रम',
        testimonials: 'सफलता की कहानियां',
        calculator: 'लाभ कैलकुलेटर',
        guide: 'इंटरैक्टिव गाइड',
        progress: 'आपकी प्रगति'
      }
    }
  };

  const mockEducationData = [
  {
    id: 1,
    title: currentLanguage === 'en' ? 'Understanding MGNREGA Basics' : 'मनरेगा की मूल बातें समझना',
    description: currentLanguage === 'en' ? 'Learn the fundamental concepts of MGNREGA, its objectives, and how it works to guarantee employment in rural areas.' : 'मनरेगा की मूलभूत अवधारणाओं, इसके उद्देश्यों और ग्रामीण क्षेत्रों में रोजगार की गारंटी के बारे में जानें।',
    icon: 'BookOpen',
    image: "https://images.unsplash.com/photo-1725700714266-7ed4e3f35074",
    imageAlt: 'Rural workers engaged in MGNREGA construction project with government supervisor',
    progress: 100,
    duration: currentLanguage === 'en' ? '2 hours' : '2 घंटे',
    difficulty: 'beginner',
    isCompleted: true,
    category: 'basics'
  },
  {
    id: 2,
    title: currentLanguage === 'en' ? 'Job Card Application Process' : 'जॉब कार्ड आवेदन प्रक्रिया',
    description: currentLanguage === 'en' ? 'Step-by-step guide to apply for MGNREGA job card, required documents, and timeline for approval.' : 'मनरेगा जॉब कार्ड के लिए आवेदन करने, आवश्यक दस्तावेजों और अनुमोदन की समयसीमा के लिए चरणबद्ध गाइड।',
    icon: 'FileText',
    image: "https://images.unsplash.com/photo-1659718282969-04b841e139db",
    imageAlt: 'Person filling out MGNREGA job card application form at government office',
    progress: 60,
    duration: currentLanguage === 'en' ? '1.5 hours' : '1.5 घंटे',
    difficulty: 'beginner',
    isCompleted: false,
    category: 'application'
  },
  {
    id: 3,
    title: currentLanguage === 'en' ? 'Know Your Rights & Benefits' : 'अपने अधिकार और लाभ जानें',
    description: currentLanguage === 'en' ? 'Comprehensive overview of your rights as a MGNREGA beneficiary and all available benefits and entitlements.' : 'मनरेगा लाभार्थी के रूप में आपके अधिकारों और सभी उपलब्ध लाभों और हकदारियों का व्यापक अवलोकन।',
    icon: 'Shield',
    image: "https://images.unsplash.com/photo-1697396592448-d69d4f44ba6e",
    imageAlt: 'Group of empowered rural women holding MGNREGA rights awareness banners',
    progress: 25,
    duration: currentLanguage === 'en' ? '3 hours' : '3 घंटे',
    difficulty: 'intermediate',
    isCompleted: false,
    category: 'rights'
  },
  {
    id: 4,
    title: currentLanguage === 'en' ? 'Wage Calculation & Payment' : 'मजदूरी गणना और भुगतान',
    description: currentLanguage === 'en' ? 'Learn how wages are calculated, payment schedules, and what to do if payments are delayed.' : 'जानें कि मजदूरी की गणना कैसे की जाती है, भुगतान कार्यक्रम, और यदि भुगतान में देरी हो तो क्या करें।',
    icon: 'Calculator',
    image: "https://images.unsplash.com/photo-1616077168712-fc6c788db4af",
    imageAlt: 'MGNREGA worker receiving wage payment through bank transfer on mobile phone',
    progress: 0,
    duration: currentLanguage === 'en' ? '2 hours' : '2 घंटे',
    difficulty: 'intermediate',
    isCompleted: false,
    category: 'basics'
  },
  {
    id: 5,
    title: currentLanguage === 'en' ? 'Filing Complaints & Grievances' : 'शिकायत और समस्याएं दर्ज करना',
    description: currentLanguage === 'en' ? 'How to file complaints for delayed payments, corruption, or other issues through proper channels.' : 'देर से भुगतान, भ्रष्टाचार या अन्य मुद्दों के लिए उचित चैनलों के माध्यम से शिकायत कैसे दर्ज करें।',
    icon: 'AlertTriangle',
    image: "https://images.unsplash.com/photo-1686535250867-4f36506e52a4",
    imageAlt: 'Rural citizen filing complaint at government grievance redressal counter',
    progress: 0,
    duration: currentLanguage === 'en' ? '1 hour' : '1 घंटा',
    difficulty: 'advanced',
    isCompleted: false,
    category: 'complaints'
  }];


  const mockTestimonials = [
  {
    id: 1,
    name: currentLanguage === 'en' ? 'Sunita Devi' : 'सुनीता देवी',
    location: currentLanguage === 'en' ? 'Sitapur, Uttar Pradesh' : 'सीतापुर, उत्तर प्रदेश',
    avatar: "https://images.unsplash.com/photo-1703606032964-3b4026de4cd6",
    avatarAlt: 'Smiling middle-aged Indian woman in traditional saree with confident expression',
    thumbnail: "https://images.unsplash.com/photo-1652106467401-977d48fa2fbc",
    thumbnailAlt: 'Rural woman working on MGNREGA road construction project with other workers',
    testimonial: currentLanguage === 'en' ? 'MGNREGA changed my life. I learned about my rights through this education center and now I earn ₹6,000 every month. My family is more secure now.' : 'मनरेगा ने मेरी जिंदगी बदल दी। मैंने इस शिक्षा केंद्र के माध्यम से अपने अधिकारों के बारे में सीखा और अब मैं हर महीने ₹6,000 कमाती हूं। मेरा परिवार अब अधिक सुरक्षित है।',
    videoUrl: 'https://example.com/video1.mp4',
    duration: '3:45'
  },
  {
    id: 2,
    name: currentLanguage === 'en' ? 'Ramesh Kumar' : 'रमेश कुमार',
    location: currentLanguage === 'en' ? 'Gaya, Bihar' : 'गया, बिहार',
    avatar: "https://images.unsplash.com/photo-1703627441916-6ce9929ccf60",
    avatarAlt: 'Confident middle-aged Indian man in white kurta with warm smile',
    thumbnail: "https://images.unsplash.com/photo-1614214055879-01b56a2cdc42",
    thumbnailAlt: 'Male MGNREGA worker operating machinery for rural infrastructure development',
    testimonial: currentLanguage === 'en' ? 'The interactive guides helped me understand the complaint process. When my wages were delayed, I knew exactly what to do and got my payment within a week.' : 'इंटरैक्टिव गाइड ने मुझे शिकायत प्रक्रिया को समझने में मदद की। जब मेरी मजदूरी में देरी हुई, तो मुझे पता था कि क्या करना है और एक सप्ताह के भीतर मुझे अपना भुगतान मिल गया।',
    videoUrl: 'https://example.com/video2.mp4',
    duration: '2:30'
  }];


  const categories = [
  { key: 'all', label: content?.[currentLanguage]?.categories?.all, icon: 'Grid3X3' },
  { key: 'basics', label: content?.[currentLanguage]?.categories?.basics, icon: 'BookOpen' },
  { key: 'application', label: content?.[currentLanguage]?.categories?.application, icon: 'FileText' },
  { key: 'rights', label: content?.[currentLanguage]?.categories?.rights, icon: 'Shield' },
  { key: 'complaints', label: content?.[currentLanguage]?.categories?.complaints, icon: 'AlertTriangle' }];


  const filteredEducationData = activeCategory === 'all' ?
  mockEducationData :
  mockEducationData?.filter((item) => item?.category === activeCategory);

  const handleStartLearning = (courseId) => {
    console.log('Starting course:', courseId);
    // In a real app, this would navigate to the course content
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Education Center - Our Voice Our Rights</title>
        <meta name="description" content="Learn about MGNREGA rights, benefits, and processes through interactive educational content" />
      </Helmet>
      <Header />
      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <Icon name="GraduationCap" size={32} className="text-primary" />
              </div>
              <LanguageToggle
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange} />

            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {content?.[currentLanguage]?.title}
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
              {content?.[currentLanguage]?.subtitle}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="Search" size={20} className="text-text-secondary" />
              </div>
              <input
                type="text"
                placeholder={content?.[currentLanguage]?.searchPlaceholder}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />

            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories?.map((category) =>
              <Button
                key={category?.key}
                variant={activeCategory === category?.key ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category?.key)}
                iconName={category?.icon}
                iconPosition="left"
                iconSize={16}
                className="mb-2">

                  {category?.label}
                </Button>
              )}
            </div>
          </div>

          {/* Progress Tracker Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <Icon name="TrendingUp" size={24} className="mr-3 text-primary" />
              {content?.[currentLanguage]?.sections?.progress}
            </h2>
            <ProgressTracker currentLanguage={currentLanguage} />
          </section>

          {/* Educational Courses Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <Icon name="BookOpen" size={24} className="mr-3 text-primary" />
              {content?.[currentLanguage]?.sections?.courses}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEducationData?.map((course) =>
              <EducationCard
                key={course?.id}
                title={course?.title}
                description={course?.description}
                icon={course?.icon}
                image={course?.image}
                imageAlt={course?.imageAlt}
                progress={course?.progress}
                duration={course?.duration}
                difficulty={course?.difficulty}
                isCompleted={course?.isCompleted}
                currentLanguage={currentLanguage}
                onStart={() => handleStartLearning(course?.id)} />

              )}
            </div>
          </section>

          {/* Interactive Guide Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <Icon name="Navigation" size={24} className="mr-3 text-primary" />
              {content?.[currentLanguage]?.sections?.guide}
            </h2>
            <InteractiveGuide currentLanguage={currentLanguage} />
          </section>

          {/* Benefit Calculator Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <Icon name="Calculator" size={24} className="mr-3 text-primary" />
              {content?.[currentLanguage]?.sections?.calculator}
            </h2>
            <BenefitCalculator currentLanguage={currentLanguage} />
          </section>

          {/* Success Stories Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <Icon name="Users" size={24} className="mr-3 text-primary" />
              {content?.[currentLanguage]?.sections?.testimonials}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockTestimonials?.map((testimonial) =>
              <VideoTestimonial
                key={testimonial?.id}
                name={testimonial?.name}
                location={testimonial?.location}
                avatar={testimonial?.avatar}
                avatarAlt={testimonial?.avatarAlt}
                thumbnail={testimonial?.thumbnail}
                thumbnailAlt={testimonial?.thumbnailAlt}
                testimonial={testimonial?.testimonial}
                videoUrl={testimonial?.videoUrl}
                duration={testimonial?.duration}
                currentLanguage={currentLanguage} />

              )}
            </div>
          </section>

          {/* Trust Signals */}
          <section className="text-center py-12 bg-surface rounded-xl border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              {currentLanguage === 'en' ? 'Trusted by Government & NGOs' : 'सरकार और एनजीओ द्वारा भरोसेमंद'}
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} className="text-primary" />
                <span className="text-sm font-medium">
                  {currentLanguage === 'en' ? 'Government Certified' : 'सरकारी प्रमाणित'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Database" size={20} className="text-accent" />
                <span className="text-sm font-medium">
                  {currentLanguage === 'en' ? 'Official Data Sources' : 'आधिकारिक डेटा स्रोत'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={20} className="text-secondary" />
                <span className="text-sm font-medium">
                  {currentLanguage === 'en' ? 'NGO Partnerships' : 'एनजीओ साझेदारी'}
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>);

};

export default EducationCenter;