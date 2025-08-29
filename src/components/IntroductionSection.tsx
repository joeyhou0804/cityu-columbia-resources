'use client';

import { useEffect, useState, useRef } from 'react';

interface IntroductionSectionProps {
  currentContent: {
    title: string;
    titleFont: string;
    welcome: string;
    welcomeFont: string;
    bodyFont: string;
    paragraph1: string;
    paragraph2: string;
  };
}

export default function IntroductionSection({ currentContent }: IntroductionSectionProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        const screenHeight = window.innerHeight;
        
        // Check if the title is above 60% of the screen (title position < 40% of screen height)
        if (rect.top < screenHeight * 0.4) {
          setImageLoaded(true);
        }
      }
    };

    // Check initial position
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative bg-white min-h-screen z-20">
      <div className="max-w-7xl mx-auto min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column - Text content with padding */}
        <div className="px-4 sm:px-6 lg:px-8 py-20 space-y-6 flex flex-col justify-center">
          <h2 
            ref={titleRef}
            className="text-black font-bold"
            style={{ 
              fontFamily: currentContent.titleFont,
              fontSize: '60px'
            }}
          >
            {currentContent.title}
          </h2>
          
          <div className="space-y-6 mt-12">
            <p 
              className="text-gray-700 text-lg leading-relaxed"
              style={{ fontFamily: currentContent.welcomeFont }}
            >
              {currentContent.welcome}
            </p>

            <p 
              className="text-gray-700 text-lg leading-relaxed"
              style={{ fontFamily: currentContent.bodyFont }}
            >
              {currentContent.paragraph1}
            </p>
            
            <p 
              className="text-gray-700 text-lg leading-relaxed"
              style={{ fontFamily: currentContent.bodyFont }}
            >
              {currentContent.paragraph2}
            </p>
          </div>
        </div>
        
        {/* Right column - Image spanning full height with top-to-bottom reveal effect */}
        <div className="min-h-screen overflow-hidden relative">
          <div 
            className={`absolute inset-0 bg-white transition-transform duration-1000 z-10 ${
              imageLoaded ? 'transform translate-y-full' : 'transform translate-y-0'
            }`}
          />
          <img 
            src="/images/columbia-cityu.png" 
            alt="Columbia University and City University of Hong Kong"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}