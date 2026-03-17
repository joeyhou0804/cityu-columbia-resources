'use client';

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { rvw } from '@/utils/scaling';
import { useIsMobile } from '@/hooks/useIsMobile';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh-cn', name: '简体中文' },
  { code: 'zh-hk', name: '繁體中文' },
];

interface LanguageSwitcherProps {
  isTransparent?: boolean;
}

export default function LanguageSwitcher({ isTransparent = false }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = params.locale as string;
  const currentLanguage = languages.find(lang => lang.code === currentLocale);
  const m = useIsMobile();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getLocalizedPath = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
    return `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center font-medium transition-colors ${
          isTransparent
            ? 'text-white hover:text-gray-200'
            : 'text-gray-700 hover:text-primary-600'
        }`}
        style={{ gap: rvw(4, 4, m), paddingLeft: rvw(10, 12, m), paddingRight: rvw(10, 12, m), paddingTop: rvw(6, 8, m), paddingBottom: rvw(6, 8, m), fontSize: rvw(12, 14, m) }}
      >
        <Globe style={{ width: rvw(12, 16, m), height: rvw(12, 16, m) }} />
        <span>{currentLanguage?.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 bg-white rounded-md shadow-lg border border-gray-200 z-50" style={{ marginTop: rvw(6, 8, m), paddingTop: rvw(6, 8, m), paddingBottom: rvw(6, 8, m), width: rvw(140, 192, m) }}>
          {languages.map((language) => (
            <Link
              key={language.code}
              href={getLocalizedPath(language.code)}
              className={`block hover:bg-gray-100 transition-colors ${
                language.code === currentLocale
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700'
              }`}
              style={{ paddingLeft: rvw(12, 16, m), paddingRight: rvw(12, 16, m), paddingTop: rvw(6, 8, m), paddingBottom: rvw(6, 8, m), fontSize: rvw(12, 14, m) }}
              onClick={() => setIsOpen(false)}
            >
              {language.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}