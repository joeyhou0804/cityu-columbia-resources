'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';

interface AdmissionPediaSectionProps {
  currentContent: {
    title: string;
    titleFont: string;
    section: string;
    sectionFont: string;
    bodyFont: string;
    paragraph1: string;
    paragraph2: string;
  };
}

export default function AdmissionPediaSection({ currentContent }: AdmissionPediaSectionProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const locale = params.locale as string;
  const imageCount = 7;

  // Get appropriate image prefix based on locale
  const getImagePrefix = () => {
    switch (locale) {
      case 'zh-cn':
        return 'zh_cn_';
      case 'zh-hk':
        return 'zh_hk_';
      default:
        return 'en_';
    }
  };

  const getImagePath = (num: number) => {
    const prefix = getImagePrefix();
    return `/images/2019/${locale === 'zh-cn' ? 'zh-cn' : locale === 'zh-hk' ? 'zh-hk' : 'en'}/${prefix}${num}.png`;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress based on section position
      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        // Section is in view and potentially sticky
        const sectionHeight = rect.height;
        const visibleFromTop = Math.abs(rect.top);
        const progress = Math.min(visibleFromTop / (sectionHeight - windowHeight), 1);
        setScrollProgress(progress);
      } else if (rect.top > 0) {
        setScrollProgress(0);
      } else {
        setScrollProgress(1);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative z-20"
      style={{ height: `${imageCount * 80}vh` }}
    >
      {/* Fixed Video Background */}
      <div className="sticky top-0 w-full h-screen overflow-hidden z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/background2.mov" type="video/mp4" />
          <source src="/videos/background2.mov" type="video/quicktime" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
        {/* Content overlay */}
        <div className="absolute inset-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
              {/* Left column - Text content */}
              <div className="col-span-2 space-y-6 flex flex-col justify-center">
                <h2 
                  className="text-white font-bold"
                  style={{ 
                    fontFamily: currentContent.titleFont,
                    fontSize: '60px'
                  }}
                >
                  {currentContent.title}
                </h2>
                
                <div className="space-y-6 mt-12">
                  <p 
                    className="text-white text-lg leading-relaxed"
                    style={{ fontFamily: currentContent.sectionFont }}
                  >
                    {currentContent.section}
                  </p>
                  <p 
                    className="text-white text-lg leading-relaxed"
                    style={{ fontFamily: currentContent.bodyFont }}
                  >
                    {currentContent.paragraph1}
                  </p>
                  
                  <p 
                    className="text-white text-lg leading-relaxed"
                    style={{ fontFamily: currentContent.bodyFont }}
                  >
                    {currentContent.paragraph2}
                  </p>
                </div>
              </div>

              {/* Right column - Images that scroll through the viewport */}
              <div className="col-span-1 relative h-full overflow-hidden">
                {[1, 2, 3, 4, 5, 6, 7].map((num, index) => {
                  // Calculate vertical position for this image based on scroll progress
                  const imageSpacing = 65; // Space between images in vh
                  const startPosition = 100 + (index * imageSpacing); // Start below viewport
                  
                  // Let images scroll naturally through and off the screen
                  const scrollDistance = imageCount * imageSpacing + 100; // Total scroll distance
                  const currentPosition = startPosition - (scrollProgress * scrollDistance);
                  
                  // Show image only when it's reasonably close to the viewport
                  const isVisible = currentPosition > -80 && currentPosition < 120;
                  
                  return (
                    <div
                      key={num}
                      className="absolute w-full px-4"
                      style={{
                        top: `${currentPosition}vh`,
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.2s ease-out'
                      }}
                    >
                      <img 
                        src={getImagePath(num)}
                        alt={`AdmissionPedia 2019 resource ${num}`}
                        className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}