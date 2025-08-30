'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';

interface VideoSectionProps {
  currentContent: {
    title: string;
    titleFont: string;
    sectionFont: string;
    bodyFont: string;
    paragraph1: string;
    videoTitle: string;
    videoSubtitle: string;
    questions: string[];
  };
}

export default function VideoSection({ currentContent }: VideoSectionProps) {
  const params = useParams();
  const locale = params.locale as string;

  const videoTitleRef = useRef<HTMLHeadingElement>(null);
  const [videoRevealed, setVideoRevealed] = useState(false);

  useEffect(() => {
    // Respect reduced motion
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setVideoRevealed(true);
      return;
    }

    const check = () => {
      // Disable animation on small screens; show immediately
      const isLgUp = window.innerWidth >= 1024;
      if (!isLgUp) {
        setVideoRevealed(true);
        return;
      }

      const el = videoTitleRef.current;
      if (!el) return;

      const { top } = el.getBoundingClientRect();
      const halfway = window.innerHeight * 0.5;

      // If the video title is higher than 50% of the screen height
      if (top < halfway) {
        setVideoRevealed(true); // one-way switch
      }
    };

    // rAF throttle
    let ticking = false;
    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          check();
          ticking = false;
        });
      }
    };

    check();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return (
    <section className="relative z-20" style={{ backgroundColor: '#003865' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* 2-row layout on lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:auto-rows-min">
          {/* Row 1: header + compact video header */}
          <div className="lg:col-span-2 space-y-6">
            <h2
              className="text-white font-bold"
              style={{ fontFamily: currentContent.titleFont, fontSize: '60px' }}
            >
              {currentContent.title}
            </h2>

            <p
              className="text-white text-lg leading-relaxed"
              style={{ fontFamily: currentContent.bodyFont }}
            >
              {currentContent.paragraph1}
            </p>

            {/* Compact video header */}
            <div className="mt-4">
              <h3
                ref={videoTitleRef}
                className="text-white text-xl font-semibold"
                style={{ fontFamily: currentContent.sectionFont }}
              >
                {currentContent.videoTitle}
              </h3>
              <p
                className="text-gray-400 text-lg leading-relaxed mt-1"
                style={{ fontFamily: currentContent.sectionFont }}
              >
                {currentContent.videoSubtitle}
              </p>
            </div>
          </div>

          {/* Row 2, left: Questions List */}
          <div className="lg:col-span-2 lg:row-start-2">
            <div className="space-y-2 mt-4">
              {currentContent.questions.map((question, index) => (
                <p
                  key={index}
                  className="text-white text-lg leading-relaxed"
                  style={{ fontFamily: currentContent.bodyFont }}
                >
                  {question}
                </p>
              ))}
            </div>
          </div>

          {/* Row 2, right: Video (slides in from right when triggered) */}
          <div
            className={[
              'lg:col-start-3 lg:row-start-2 self-start',
              // Motion-safe transition; initial state off-screen to the right on lg+
              'motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out',
              videoRevealed
                ? 'motion-safe:opacity-100 motion-safe:translate-x-0'
                : // small nudge on mobile, full slide on lg+
                  'motion-safe:opacity-0 motion-safe:translate-x-8 lg:motion-safe:translate-x-full',
            ].join(' ')}
          >
            <div className="w-full max-w-md">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 */ }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/DNJFN6HK7MQ"
                  title="Joey's Question & Answer Episode 1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
