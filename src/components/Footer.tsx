'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Globe, BookOpen, ExternalLink } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const params = useParams();
  const locale = params.locale as string;

  const content = {
    en: {
      linksContactTitle: 'LINKS & CONTACT',
      disclaimerTitle: 'DISCLAIMER',
      titleFont: 'Sofia Sans ExtraBold, sans-serif',
      bodyFont: 'Sofia Sans Light, sans-serif',
      officialWebsite: 'Official Website of the Joint Bachelors Degree Program between CityU and Columbia',
      disclaimer: 'This website is independently established by students participating in the Joint Bachelors Degree Program between City University and Columbia University. The advice provided on this website does not replace the official opinions of City University of Hong Kong or Columbia University, nor does it guarantee to reflect the most updated program structure or admission status. Visitors and readers who refer to this website are kindly reminded to take note of this disclaimer.',
      copyright: 'Joey Hou | Made in 2021 | Updated in 2025',
    },
    'zh-cn': {
      linksContactTitle: '链接与联系方式',
      disclaimerTitle: '免责声明',
      titleFont: 'ZhiBingMei Bold, sans-serif',
      bodyFont: 'FangZheng XiYaSong, serif',
      officialWebsite: '城大-哥大双联学士学位项目官方网站',
      disclaimer: '本网站由参加香港城市大学-哥伦比亚大学双联学位学士项目的同学自主建立。本网站所提供的建议不能代替香港城市大学或哥伦比亚大学的官方意见，也不能保证反映最新的项目设置或录取情况。希望参考本网站的相关人士注意，特此声明。',
      copyright: '侯江天 | 2021年制作 | 2025年更新',
    },
    'zh-hk': {
      linksContactTitle: '連結與聯絡方式',
      disclaimerTitle: '免責聲明',
      titleFont: 'ChironHeiHK Bold, sans-serif',
      bodyFont: 'ChironSungHK Regular, serif',
      officialWebsite: '城大－哥大雙聯學士學位項目官方網站',
      disclaimer: '本網站由參加香港城市大學－哥倫比亞大學雙聯學位學士項目的同學自主建立。本網站所提供的建議不能取代香港城市大學或哥倫比亞大學的官方意見，亦不能保證反映最新的項目設置或錄取情況。希望參考本網站的相關人士注意，特此聲明。',
      copyright: '侯江天 | 2021年製作 | 2025年更新',
    }
  };

  const currentContent = content[locale as keyof typeof content] || content.en;

  return (
    <footer className="relative z-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* First Row: Links & Contact (3/4 width) + Languages (1/4 width) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Links & Contact - takes 3/4 width */}
          <div className="col-span-1 md:col-span-3">
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ fontFamily: currentContent.titleFont }}
            >
              {currentContent.linksContactTitle}
            </h3>
            <div className="space-y-3">
              <div>
                <a 
                  href="https://cityu-hk.gs.columbia.edu/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary-400 transition-colors flex items-center"
                  style={{ fontFamily: currentContent.bodyFont }}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {currentContent.officialWebsite}
                </a>
              </div>
              <div 
                className="flex items-center text-gray-300"
                style={{ fontFamily: currentContent.bodyFont }}
              >
                <Mail className="h-5 w-5 mr-2" />
                <span>cityucolumbiaresources@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Languages (no title) - takes 1/4 width */}
          <div className="col-span-1">
            <ul className="space-y-2 mt-6">
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

        {/* Second Row: Disclaimer - full width */}
        <div className="border-t border-gray-800 pt-8">
          <h3 
            className="text-lg font-semibold mb-4"
            style={{ fontFamily: currentContent.titleFont }}
          >
            {currentContent.disclaimerTitle}
          </h3>
          <p 
            className="text-gray-300 text-sm leading-relaxed"
            style={{ fontFamily: currentContent.bodyFont }}
          >
            {currentContent.disclaimer}
          </p>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p 
            className="text-gray-400"
            style={{ fontFamily: currentContent.titleFont }}
          >
            {currentContent.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}