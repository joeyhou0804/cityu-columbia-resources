'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Video, Users, Award } from 'lucide-react';

export default function ResourceGrid() {
  const t = useTranslations('resources');
  const params = useParams();
  const locale = params.locale as string;

  const resourceCategories = [
    {
      title: t('cityu.title'),
      description: t('cityu.description'),
      icon: BookOpen,
      href: `/${locale}/cityu`,
      color: 'bg-blue-500',
    },
    {
      title: t('columbia.title'),
      description: t('columbia.description'),
      icon: Award,
      href: `/${locale}/columbia`,
      color: 'bg-indigo-500',
    },
  ];

  return (
    <section className="relative z-20 py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access comprehensive resources for both universities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {resourceCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={index}
                href={category.href}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <div className={`w-16 h-16 ${category.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                    {category.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {category.description}
                  </p>

                  <div className="flex items-center text-primary-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>Explore Resources</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}