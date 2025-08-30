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
    videoTitle2: string;
    videoSubtitle2: string;
    questions2: string[];
  };
}

export default function VideoSection({ currentContent }: VideoSectionProps) {
  const params = useParams();
  const locale = params.locale as string;

  // Refs for per-video reveal triggers
  const videoTitleRef1 = useRef<HTMLHeadingElement>(null);
  const videoTitleRef2 = useRef<HTMLHeadingElement>(null);

  const [video1Revealed, setVideo1Revealed] = useState(false);
  const [video2Revealed, setVideo2Revealed] = useState(false);

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    // show immediately for reduced motion
    if (reduceMotion) {
      setVideo1Revealed(true);
      setVideo2Revealed(true);
      return;
    }

    const check = () => {
      const isLgUp = window.innerWidth >= 1024;
      if (!isLgUp) {
        setVideo1Revealed(true);
        setVideo2Revealed(true);
        return;
      }

      const halfway = window.innerHeight * 0.5;

      if (videoTitleRef1.current && !video1Revealed) {
        const { top } = videoTitleRef1.current.getBoundingClientRect();
        if (top < halfway) setVideo1Revealed(true);
      }
      if (videoTitleRef2.current && !video2Revealed) {
        const { top } = videoTitleRef2.current.getBoundingClientRect();
        if (top < halfway) setVideo2Revealed(true);
      }
    };

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
  }, [video1Revealed, video2Revealed]);

  return (
    <section className="relative z-20" style={{ backgroundColor: '#003865' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Grid (lg+):
            Row 1: page header + Video 1 header (left)
            Row 2: Questions 1 (left) + Video 1 (right)
            Row 3: Video 2 header (left)
            Row 4: Questions 2 (left) + Video 2 (right)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:auto-rows-min">
          {/* Row 1: page title/paragraph + video 1 title/subtitle */}
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

            {/* Video 1 header */}
            <div>
              <h3
                ref={videoTitleRef1}
                className="text-white text-xl font-semibold mt-10 lg:mt-12"
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

          {/* Row 2 (left): Questions 1 */}
          <div className="lg:col-span-2 lg:row-start-2">
            <div className="space-y-2">
              {currentContent.questions.map((q, i) => (
                <p
                  key={i}
                  className="text-white text-lg leading-relaxed"
                  style={{ fontFamily: currentContent.bodyFont }}
                >
                  {q}
                </p>
              ))}
            </div>
          </div>

          {/* Row 2 (right): Video 1 (slides in) */}
          <div
            className={[
              'lg:col-start-3 lg:row-start-2 self-start',
              'motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out',
              video1Revealed
                ? 'motion-safe:opacity-100 motion-safe:translate-x-0'
                : 'motion-safe:opacity-0 motion-safe:translate-x-8 lg:motion-safe:translate-x-full',
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

          {/* Row 3 (left): Video 2 header only */}
          <div className="lg:col-span-2 lg:row-start-3">
            <h3
              ref={videoTitleRef2}
              className="text-white text-xl font-semibold mt-10 lg:mt-12"
              style={{ fontFamily: currentContent.sectionFont }}
            >
              {currentContent.videoTitle2}
            </h3>
            <p
              className="text-gray-400 text-lg leading-relaxed mt-1"
              style={{ fontFamily: currentContent.sectionFont }}
            >
              {currentContent.videoSubtitle2}
            </p>
          </div>

          {/* Row 4 (left): Questions 2 */}
          <div className="lg:col-span-2 lg:row-start-4">
            <div className="space-y-2">
              {currentContent.questions2.map((q, i) => (
                <p
                  key={i}
                  className="text-white text-lg leading-relaxed"
                  style={{ fontFamily: currentContent.bodyFont }}
                >
                  {q}
                </p>
              ))}
            </div>
          </div>

          {/* Row 4 (right): Video 2 (slides in; top-aligns with Questions 2) */}
          <div
            className={[
              'lg:col-start-3 lg:row-start-4 self-start',
              'motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out',
              video2Revealed
                ? 'motion-safe:opacity-100 motion-safe:translate-x-0'
                : 'motion-safe:opacity-0 motion-safe:translate-x-8 lg:motion-safe:translate-x-full',
            ].join(' ')}
          >
            <div className="w-full max-w-md">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 */ }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/DNJFN6HK7MQ"
                  title="Joey's Question & Answer Episode 2"
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
