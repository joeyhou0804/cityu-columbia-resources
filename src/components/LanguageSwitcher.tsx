'use client';

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh-cn', name: '简体中文' },
  { code: 'zh-hk', name: '繁體中文' },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = params.locale as string;
  const currentLanguage = languages.find(lang => lang.code === currentLocale);

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
        className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
      >
        <Globe size={16} />
        <span>{currentLanguage?.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          {languages.map((language) => (
            <Link
              key={language.code}
              href={getLocalizedPath(language.code)}
              className={`block px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                language.code === currentLocale
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700'
              }`}
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