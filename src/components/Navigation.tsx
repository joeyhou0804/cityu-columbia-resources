'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navigation() {
  const t = useTranslations('navigation');
  const params = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const locale = params.locale as string;

  const logoContent = {
    en: {
      lines: ['CITYU', 'COLUMBIA', 'RESOURCES'],
      className: 'logo-text-en'
    },
    'zh-cn': {
      lines: ['香港城市大学', '哥伦比亚大学', '申请资源库'],
      className: 'logo-text-zh-cn'
    },
    'zh-hk': {
      lines: ['香港城市大學', '哥倫比亞大學', '申請資源庫'],
      className: 'logo-text-zh-hk'
    }
  };

  const currentLogo = logoContent[locale as keyof typeof logoContent] || logoContent.en;

  const navItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'cityu', href: `/${locale}/cityu` },
    { key: 'columbia', href: `/${locale}/columbia` },
    { key: 'about', href: `/${locale}/about` },
    { key: 'contact', href: `/${locale}/contact` },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <Link 
            href={`/${locale}`} 
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <div className={`logo-text ${currentLogo.className}`}>
              <div className="logo-line-1">{currentLogo.lines[0]}</div>
              <div className="logo-line-2">{currentLogo.lines[1]}</div>
              <div className="logo-line-3">{currentLogo.lines[2]}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}