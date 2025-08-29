'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Globe, BookOpen } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-primary-400 mr-2" />
              <span className="text-xl font-bold">CityU Columbia Resources</span>
            </div>
            <p className="text-gray-300 mb-4">
              {t('contact')}
            </p>
            <div className="flex items-center text-gray-300">
              <Mail className="h-5 w-5 mr-2" />
              <span>contact@cityucolumbia.com</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/cityu`} className="text-gray-300 hover:text-primary-400 transition-colors">
                  CityU Resources
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/columbia`} className="text-gray-300 hover:text-primary-400 transition-colors">
                  Columbia Resources
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-gray-300 hover:text-primary-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-300 hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Languages */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Languages</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/en" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  English
                </Link>
              </li>
              <li>
                <Link href="/zh-cn" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  简体中文
                </Link>
              </li>
              <li>
                <Link href="/zh-hk" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  繁體中文
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}