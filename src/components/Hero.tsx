'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, BookOpen, Video } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('home');
  const params = useParams();
  const locale = params.locale as string;

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
          <source src="/videos/background1.mov" type="video/mp4" />
          <source src="/videos/background1.mov" type="video/quicktime" />
          {/* Fallback for browsers that don't support video */}
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Hero Content */}
      <section className="relative h-screen flex items-center justify-center z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
            {t('subtitle')}
          </p>
          <p className="text-lg mb-12 max-w-3xl mx-auto drop-shadow-md">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/cityu`}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-600 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-lg backdrop-blur-sm"
            >
              <BookOpen className="mr-2" size={20} />
              CityU Resources
              <ArrowRight className="ml-2" size={20} />
            </Link>
            
            <Link
              href={`/${locale}/columbia`}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary-500 bg-opacity-90 border-2 border-white rounded-lg hover:bg-primary-400 transition-colors shadow-lg backdrop-blur-sm"
            >
              <Video className="mr-2" size={20} />
              Columbia Resources
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}