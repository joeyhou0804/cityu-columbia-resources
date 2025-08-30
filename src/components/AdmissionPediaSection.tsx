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

  // ---- Configurable constants ----
  const imageCount = 7;
  const IMAGE_SPACING_VH = 65;   // vertical spacing between images
  const LAST_IMAGE_STOP_VH = 10; // last image should stop 10vh above bottom

  // Move exactly enough so the last image reaches 10vh when progress === 1
  const lastIndex = imageCount - 1;
  const scrollDistance = LAST_IMAGE_STOP_VH + lastIndex * IMAGE_SPACING_VH;

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
    return `/images/2019/${
      locale === 'zh-cn' ? 'zh-cn' : locale === 'zh-hk' ? 'zh-hk' : 'en'
    }/${prefix}${num}.png`;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Progress through the sticky span: 0 -> 1
      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const sectionHeight = rect.height;
        const visibleFromTop = Math.abs(rect.top);
        const raw = visibleFromTop / (sectionHeight - windowHeight);
        setScrollProgress(Math.min(Math.max(raw, 0), 1));
      } else if (rect.top > 0) {
        setScrollProgress(0);
      } else {
        setScrollProgress(1);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20"
      // Tie section height to the image travel for a seamless handoff (no pause)
      style={{ height: `${scrollDistance}vh` }}
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
          {/* Remove bottom padding so images sit flush with the bottom */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-0 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
              {/* Left column - Text content */}
              <div className="col-span-2 space-y-6 flex flex-col justify-center">
                <h2
                  className="text-white font-bold"
                  style={{
                    fontFamily: currentContent.titleFont,
                    fontSize: '60px',
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
                {Array.from({ length: imageCount }, (_, i) => i + 1).map((num, index) => {
                  // Start at top-of-list: image 1 visible first.
                  // Each image begins below the viewport (negative bottom), then moves up with progress.
                  const currentBottom =
                    (-index * IMAGE_SPACING_VH) + (scrollProgress * scrollDistance);

                  // Only fade in when near the viewport
                  const isVisible = currentBottom > -80 && currentBottom < 120;

                  return (
                    <div
                      key={num}
                      className="absolute w-full px-4"
                      style={{
                        bottom: `${currentBottom}vh`,
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.2s ease-out',
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
