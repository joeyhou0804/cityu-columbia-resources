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
    <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            {t('subtitle')}
          </p>
          <p className="text-lg mb-12 max-w-3xl mx-auto text-primary-50">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/cityu`}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-600 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
            >
              <BookOpen className="mr-2" size={20} />
              CityU Resources
              <ArrowRight className="ml-2" size={20} />
            </Link>
            
            <Link
              href={`/${locale}/columbia`}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary-500 border-2 border-white rounded-lg hover:bg-primary-400 transition-colors shadow-lg"
            >
              <Video className="mr-2" size={20} />
              Columbia Resources
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}