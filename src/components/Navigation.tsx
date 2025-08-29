'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navigation() {
  const params = useParams();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const screenHeight = window.innerHeight;
      setIsScrolled(scrollPosition > screenHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <Link 
            href={`/${locale}`} 
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <div className={`logo-text ${currentLogo.className} ${
              isScrolled ? '' : 'text-white'
            }`}>
              <div className={`logo-line-1 ${isScrolled ? '' : '!text-white'}`}>{currentLogo.lines[0]}</div>
              <div className={`logo-line-2 ${isScrolled ? '' : '!text-white'}`}>{currentLogo.lines[1]}</div>
              <div className={`logo-line-3 ${isScrolled ? '' : '!text-white'}`}>{currentLogo.lines[2]}</div>
            </div>
          </Link>

          {/* Language Switcher */}
          <div>
            <LanguageSwitcher isTransparent={!isScrolled} />
          </div>
        </div>
      </div>
    </nav>
  );
}