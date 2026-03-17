'use client';

import { useEffect, useState, useRef } from 'react';
import { vw, rvw } from '@/utils/scaling';
import { useIsMobile } from '@/hooks/useIsMobile';

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
  const m = useIsMobile();

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
    <section className="relative bg-white z-20" style={{ minHeight: rvw(700, 900, m) }}>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: rvw(700, 900, m), maxWidth: m ? 'none' : vw(1280), marginLeft: 'auto', marginRight: 'auto', gap: rvw(20, 32, m) }}>
        {/* Left column - Text content with padding */}
        <div className="flex flex-col justify-center" style={{ paddingLeft: rvw(16, 32, m), paddingRight: rvw(16, 32, m), paddingTop: rvw(48, 80, m), paddingBottom: rvw(48, 80, m), gap: rvw(16, 24, m) }}>
          <h2
            ref={titleRef}
            className="text-black font-bold"
            style={{
              fontFamily: currentContent.titleFont,
              fontSize: rvw(32, 60, m),
            }}
          >
            {currentContent.title}
          </h2>

          <div className="flex flex-col" style={{ gap: rvw(16, 24, m), marginTop: rvw(32, 48, m) }}>
            <p
              className="text-gray-700 leading-relaxed"
              style={{ fontFamily: currentContent.welcomeFont, fontSize: rvw(14, 18, m) }}
            >
              {currentContent.welcome}
            </p>

            <p
              className="text-gray-700 leading-relaxed"
              style={{ fontFamily: currentContent.bodyFont, fontSize: rvw(14, 18, m) }}
            >
              {currentContent.paragraph1}
            </p>

            <p
              className="text-gray-700 leading-relaxed"
              style={{ fontFamily: currentContent.bodyFont, fontSize: rvw(14, 18, m) }}
            >
              {currentContent.paragraph2}
            </p>
          </div>
        </div>
        
        {/* Right column - Image spanning full height with top-to-bottom reveal effect */}
        <div className="overflow-hidden relative" style={{ minHeight: rvw(700, 900, m) }}>
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