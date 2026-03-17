'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoWithFallbackProps {
  src: string;
  fallbackSrc: string;
  className?: string;
}

export default function VideoWithFallback({ src, fallbackSrc, className }: VideoWithFallbackProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setShowFallback(true);
      });
    }
  }, []);

  if (showFallback) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={fallbackSrc} alt="" className={className} style={{ objectFit: 'cover' }} />
    );
  }

  return (
    <video ref={videoRef} className={className} autoPlay muted loop playsInline>
      <source src={src} type="video/mp4" />
    </video>
  );
}
