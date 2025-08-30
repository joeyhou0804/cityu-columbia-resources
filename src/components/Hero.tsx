'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function Hero() {
  const [showFirstRow, setShowFirstRow] = useState(false);
  const [showSecondRow, setShowSecondRow] = useState(false);
  const params = useParams();
  const locale = params.locale as string;

  // Content and font configuration for each language
  const content = {
    en: {
      firstRow: 'THE ROAD TO',
      secondRow: 'SUCCESS',
      firstRowFont: 'Sofia Sans Light, sans-serif',
      secondRowFont: 'Sofia Sans Black, sans-serif'
    },
    'zh-cn': {
      firstRow: '通往',
      secondRow: '成功之路',
      firstRowFont: 'ZhiBingMei Medium, sans-serif',
      secondRowFont: 'ZhiBingMei Heavy, sans-serif'
    },
    'zh-hk': {
      firstRow: '通往',
      secondRow: '成功之路',
      firstRowFont: 'ChironHeiHK Medium, sans-serif',
      secondRowFont: 'ChironHeiHK Heavy, sans-serif'
    }
  };

  const currentContent = content[locale as keyof typeof content] || content.en;

  useEffect(() => {
    // Fade in first row immediately
    const firstTimer = setTimeout(() => {
      setShowFirstRow(true);
    }, 100);

    // Fade in second row after first row
    const secondTimer = setTimeout(() => {
      setShowSecondRow(true);
    }, 400);

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(secondTimer);
    };
  }, []);
  return (
    <>
      {/* Fixed Video Background */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/background1.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Hero Content */}
      <section className="relative h-screen z-10">
        <div className="absolute w-full text-center text-white" style={{ top: '5%' }}>
          <div 
            className={`text-xl font-bold transition-opacity duration-1000 ${showFirstRow ? 'opacity-100' : 'opacity-0'}`} 
            style={{ fontSize: '20px', lineHeight: '1', fontFamily: currentContent.firstRowFont }}
          >
            {currentContent.firstRow}
          </div>
          <div 
            className={`font-bold transition-opacity duration-1000 ${showSecondRow ? 'opacity-100' : 'opacity-0'}`}
            style={{ fontSize: '120px', lineHeight: '1', fontFamily: currentContent.secondRowFont }}
          >
            {currentContent.secondRow}
          </div>
        </div>
      </section>
    </>
  );
}