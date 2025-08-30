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

type VideoConfig =
  | { type: 'bilibili'; url: string; thumbnail: string }
  | { type: 'youtube'; url: string; thumbnail?: string };

export default function VideoSection({ currentContent }: VideoSectionProps) {
  const params = useParams();
  const locale = params.locale as string;

  // Get video URLs and thumbnails
  const getVideoConfig = (episode: 1 | 2): VideoConfig => {
    if (locale === 'zh-cn') {
      return {
        type: 'bilibili' as const,
        url:
          episode === 1
            ? 'https://www.bilibili.com/video/BV1U54y1Q7fS'
            : 'https://www.bilibili.com/video/BV1kU4y1b7cV',
        thumbnail:
          episode === 1
            ? '/images/videos/zh_cn_video_1.jpg'
            : '/images/videos/zh_cn_video_2.png',
      };
    } else {
      return {
        type: 'youtube' as const,
        url:
          episode === 1
            ? 'https://www.youtube.com/watch?v=DNJFN6HK7MQ'
            : 'https://www.youtube.com/watch?v=8d3AIE3-kQA',
      };
    }
  };

  // Refs for per-video reveal triggers
  const videoTitleRef1 = useRef<HTMLHeadingElement>(null);
  const videoTitleRef2 = useRef<HTMLHeadingElement>(null);

  const [video1Revealed, setVideo1Revealed] = useState(false);
  const [video2Revealed, setVideo2Revealed] = useState(false);

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const check = () => {
      const isLgUp = window.innerWidth >= 1024;
      if (reduceMotion || !isLgUp) {
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
                {(() => {
                  const config = getVideoConfig(1);
                  return (
                    <a
                      href={config.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-0 left-0 w-full h-full block hover:opacity-90 transition-opacity duration-300"
                    >
                      {config.type === 'youtube' ? (
                        <YouTubeThumb
                          url={config.url}
                          alt="Joey's Question & Answer Episode 1"
                          className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                      ) : (
                        <img
                          src={config.thumbnail}
                          alt="Joey's Question & Answer Episode 1"
                          className="w-full h-full object-cover rounded-lg shadow-lg"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                    </a>
                  );
                })()}
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
                {(() => {
                  const config = getVideoConfig(2);
                  return (
                    <a
                      href={config.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-0 left-0 w-full h-full block hover:opacity-90 transition-opacity duration-300"
                    >
                      {config.type === 'youtube' ? (
                        <YouTubeThumb
                          url={config.url}
                          alt="Joey's Question & Answer Episode 2"
                          className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                      ) : (
                        <img
                          src={config.thumbnail}
                          alt="Joey's Question & Answer Episode 2"
                          className="w-full h-full object-cover rounded-lg shadow-lg"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                    </a>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Helpers: robust YouTube thumbnail with oEmbed + fallbacks ---------- */

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1);
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname.startsWith('/embed/')) return u.pathname.split('/embed/')[1]?.split(/[?/]/)[0] || null;
      const v = u.searchParams.get('v');
      if (v) return v;
    }
  } catch {}
  return null;
}

function buildYouTubeThumbnailCandidates(id: string): string[] {
  return [
    `https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp`,
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi_webp/${id}/sddefault.webp`,
    `https://img.youtube.com/vi/${id}/sddefault.jpg`,
    `https://i.ytimg.com/vi_webp/${id}/hqdefault.webp`,
    `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    `https://i.ytimg.com/vi_webp/${id}/mqdefault.webp`,
    `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
    `https://img.youtube.com/vi/${id}/default.jpg`,
  ];
}

function YouTubeThumb({
  url,
  alt,
  className,
}: {
  url: string;
  alt: string;
  className?: string;
}) {
  const [candidates, setCandidates] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = getYouTubeId(url);
    if (!id) {
      setCandidates([]);
      return;
    }

    const structural = buildYouTubeThumbnailCandidates(id);
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;

    let abort = false;
    (async () => {
      try {
        const res = await fetch(oembedUrl);
        if (abort) return;
        if (res.ok) {
          const data: { thumbnail_url?: string } = await res.json();
          const t = data.thumbnail_url;
          if (t) {
            const list = [t, ...structural.filter((s) => s !== t)];
            setCandidates(list);
            setIdx(0);
            return;
          }
        }
      } catch {
        // ignore and fall back
      }
      setCandidates(structural);
      setIdx(0);
    })();

    return () => {
      abort = true;
    };
  }, [url]);

  if (candidates.length === 0) {
    return (
      <div
        className={['rounded-lg shadow-lg', className].filter(Boolean).join(' ')}
        style={{ background: '#0b2740' }}
        aria-label={alt}
      />
    );
  }

  const src = candidates[Math.min(idx, candidates.length - 1)];

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => {
        setIdx((i) => (i + 1 < candidates.length ? i + 1 : i));
      }}
    />
  );
}
