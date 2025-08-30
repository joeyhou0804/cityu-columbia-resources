'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';

interface VideoClipSectionProps {
  currentContent: {
    title: string;
    titleFont: string;
    subtitle: string;
    subtitleFont: string;
  };
}

/* ========= Helpers ========= */

// Extract YouTube video ID
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

// Extract Bilibili BV id
function getBilibiliId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('bilibili.com')) {
      const match = u.pathname.match(/\/video\/(BV[\w]+)/);
      return match ? match[1] : null;
    }
  } catch {}
  return null;
}

/** 
 * Local thumbnail map for Bilibili (same approach as your first section).
 * Replace the right-hand paths with your actual files in /public/images/videos/.
 * If a BV id isn’t in this map, we’ll fall back to /images/videos/bili/<BV>.jpg
 */
const BILIBILI_THUMB_MAP: Record<string, string> = {
  // Mapping Bilibili BV ids to available thumbnail files
  BV1q5411g7HT: '/images/videos/zh_cn_video_3.png',
  BV1z54y1j7dg: '/images/videos/zh_cn_video_4.png',
  BV19V411J7tA: '/images/videos/zh_cn_video_5.png',
  BV13y4y1s7UR: '/images/videos/zh_cn_video_6.png',
};

// Determine platform + local thumbnail (no external fetches)
function getVideoConfig(url: string) {
  if (url.includes('bilibili.com')) {
    const bv = getBilibiliId(url);
    const localThumb = bv
      ? (BILIBILI_THUMB_MAP[bv] ?? `/images/videos/bili/${bv}.jpg`)
      : ''; // empty → will show placeholder bg
    return { platform: 'bilibili' as const, id: bv, url, thumbnail: localThumb };
  } else {
    const yt = getYouTubeId(url);
    const thumb = yt ? `https://img.youtube.com/vi/${yt}/maxresdefault.jpg` : '';
    return { platform: 'youtube' as const, id: yt, url, thumbnail: thumb };
  }
}

// URLs per locale
const getVideoUrls = (locale: string) => {
  if (locale === 'zh-cn') {
    return [
      'https://www.bilibili.com/video/BV1q5411g7HT',
      'https://www.bilibili.com/video/BV1z54y1j7dg',
      'https://www.bilibili.com/video/BV19V411J7tA',
      'https://www.bilibili.com/video/BV13y4y1s7UR',
    ];
  } else {
    return [
      'https://www.youtube.com/watch?v=4qwf-kDn4t8&list=PLc4a5rxGRcc9tBu3vNbC1yTfV3ZIWs3-6&index=3',
      'https://www.youtube.com/watch?v=vBYp-yZe57A&list=PLc4a5rxGRcc9tBu3vNbC1yTfV3ZIWs3-6&index=6',
      'https://www.youtube.com/watch?v=bR_HLhUsh4U&list=PLc4a5rxGRcc9tBu3vNbC1yTfV3ZIWs3-6&index=4',
      'https://www.youtube.com/watch?v=aNxRQIW2Jjs&list=PLc4a5rxGRcc9tBu3vNbC1yTfV3ZIWs3-6&index=5',
    ];
  }
};

export default function VideoClipSection({ currentContent }: VideoClipSectionProps) {
  const params = useParams();
  const locale = params.locale as string;
  const videoUrls = getVideoUrls(locale);

  // Measure one full set to compute marquee duration (px / pxPerSec)
  const firstSetRef = useRef<HTMLDivElement>(null);
  const [durationSec, setDurationSec] = useState(60);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const pxPerSecond = 30; // tweak for speed
    const measure = () => {
      const el = firstSetRef.current;
      if (!el) return;
      const w = el.scrollWidth; // width of one full set
      if (w > 0) setDurationSec(w / pxPerSecond);
    };
    measure();
    window.addEventListener('resize', measure);

    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const onMotion = () => setReducedMotion(!!media?.matches);
    onMotion();
    media?.addEventListener?.('change', onMotion);

    return () => {
      window.removeEventListener('resize', measure);
      media?.removeEventListener?.('change', onMotion);
    };
  }, []);

  // Card
  const Card = ({ url, index }: { url: string; index: number }) => {
    const cfg = getVideoConfig(url);
    const alt = `Video Clip ${index + 1}`;

    return (
      <div className="flex-shrink-0" style={{ width: '320px' }}>
        <div className="relative" style={{ paddingBottom: '56.25%' /* 16:9 */ }}>
          <a
            href={cfg.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-0 left-0 w-full h-full block hover:opacity-90 transition-opacity duration-300"
          >
            {cfg.thumbnail ? (
              <img
                src={cfg.thumbnail}
                alt={alt}
                className="w-full h-full object-cover rounded-lg shadow-lg"
                loading="lazy"
                decoding="async"
              />
            ) : (
              // Minimal placeholder if a local file isn't present
              <div
                className="w-full h-full rounded-lg shadow-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#fe669e,#6aa6ff)' }}
              >
                <span className="text-white font-semibold">
                  {cfg.platform === 'bilibili' ? 'B站' : 'Video'}
                </span>
              </div>
            )}
          </a>
        </div>
      </div>
    );
  };

  return (
    <section className="relative z-20" style={{ backgroundColor: '#BB3568' }}>
      {/* Centered header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2
          className="text-white font-bold mb-4"
          style={{ fontFamily: currentContent.titleFont, fontSize: '60px' }}
        >
          {currentContent.title}
        </h2>
        <p
          className="text-white text-lg mb-12"
          style={{ fontFamily: currentContent.subtitleFont }}
        >
          {currentContent.subtitle}
        </p>
      </div>

      {/* Full-bleed infinite marquee */}
      <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen">
        <div className="overflow-hidden px-4 sm:px-6 lg:px-8">
          <div
            className="flex gap-6 w-max will-change-transform"
            style={
              reducedMotion
                ? undefined
                : { animation: `vclip-marquee ${durationSec}s linear infinite` }
            }
          >
            {/* First set (measured) */}
            <div ref={firstSetRef} className="flex gap-6">
              {videoUrls.map((url, i) => (
                <Card key={`set1-${i}`} url={url} index={i} />
              ))}
            </div>
            {/* Second set (duplicate) */}
            <div className="flex gap-6" aria-hidden="true">
              {videoUrls.map((url, i) => (
                <Card key={`set2-${i}`} url={url} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-16" />

      <style jsx global>{`
        @keyframes vclip-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
