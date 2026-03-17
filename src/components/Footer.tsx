'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Globe, BookOpen, ExternalLink, Linkedin, Youtube, Facebook, Instagram } from 'lucide-react';
import { vw, rvw } from '@/utils/scaling';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function Footer() {
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
  const m = useIsMobile();

  return (
    <footer className="relative z-20 bg-gray-900 text-white">
      <div style={{ maxWidth: m ? 'none' : vw(1280), marginLeft: 'auto', marginRight: 'auto', paddingLeft: rvw(16, 32, m), paddingRight: rvw(16, 32, m), paddingTop: rvw(32, 48, m), paddingBottom: rvw(32, 48, m) }}>
        {/* First Row: Links & Contact (3/4 width) + Languages (1/4 width) */}
        <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: rvw(20, 32, m), marginBottom: rvw(24, 32, m) }}>
          {/* Links & Contact - takes 3/4 width */}
          <div className="col-span-1 md:col-span-3">
            <h3
              className="font-semibold text-center md:text-left"
              style={{ fontFamily: currentContent.titleFont, fontSize: rvw(14, 18, m), marginBottom: rvw(12, 16, m) }}
            >
              {currentContent.linksContactTitle}
            </h3>
            <div className="flex flex-col items-center md:items-start" style={{ gap: rvw(10, 12, m) }}>
              <div>
                <a
                  href="https://cityu-hk.gs.columbia.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary-400 transition-colors flex items-center"
                  style={{ fontFamily: currentContent.bodyFont, fontSize: rvw(13, 16, m) }}
                >
                  <ExternalLink style={{ width: rvw(12, 16, m), height: rvw(12, 16, m), marginRight: rvw(6, 8, m) }} />
                  {currentContent.officialWebsite}
                </a>
              </div>
              <div
                className="flex items-center text-gray-300"
                style={{ fontFamily: currentContent.bodyFont, fontSize: rvw(13, 16, m) }}
              >
                <Mail style={{ width: rvw(14, 20, m), height: rvw(14, 20, m), marginRight: rvw(6, 8, m) }} />
                <span>cityucolumbiaresources@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Languages (no title) - takes 1/4 width */}
          <div className="col-span-1">
            <ul className="flex flex-col items-center md:items-start" style={{ gap: rvw(6, 8, m), marginTop: rvw(20, 24, m) }}>
              <li>
                <Link href="/en" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center" style={{ fontSize: rvw(13, 16, m) }}>
                  <Globe style={{ width: rvw(12, 16, m), height: rvw(12, 16, m), marginRight: rvw(6, 8, m) }} />
                  English
                </Link>
              </li>
              <li>
                <Link href="/zh-cn" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center" style={{ fontSize: rvw(13, 16, m) }}>
                  <Globe style={{ width: rvw(12, 16, m), height: rvw(12, 16, m), marginRight: rvw(6, 8, m) }} />
                  简体中文
                </Link>
              </li>
              <li>
                <Link href="/zh-hk" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center" style={{ fontSize: rvw(13, 16, m) }}>
                  <Globe style={{ width: rvw(12, 16, m), height: rvw(12, 16, m), marginRight: rvw(6, 8, m) }} />
                  繁體中文
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Second Row: Disclaimer - full width */}
        <div className="border-t border-gray-800" style={{ paddingTop: rvw(24, 32, m) }}>
          <h3
            className="font-semibold text-center md:text-left"
            style={{ fontFamily: currentContent.titleFont, fontSize: rvw(14, 18, m), marginBottom: rvw(12, 16, m) }}
          >
            {currentContent.disclaimerTitle}
          </h3>
          <p
            className="text-gray-300 leading-relaxed"
            style={{ fontFamily: currentContent.bodyFont, fontSize: rvw(11, 14, m) }}
          >
            {currentContent.disclaimer}
          </p>
        </div>

        <div className="border-t border-gray-800" style={{ marginTop: rvw(24, 32, m), paddingTop: rvw(24, 32, m) }}>
          <div className="flex flex-col md:flex-row items-center justify-between" style={{ gap: rvw(12, 16, m) }}>
            <p
              className="text-gray-400 text-center md:text-left"
              style={{ fontFamily: currentContent.titleFont, fontSize: rvw(11, 14, m) }}
            >
              {currentContent.copyright}
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center" style={{ gap: rvw(12, 16, m) }}>
              <a
                href="https://www.linkedin.com/in/joey1m/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin style={{ width: rvw(16, 20, m), height: rvw(16, 20, m) }} />
              </a>
              <a
                href="https://www.youtube.com/channel/UCYglU1CCVqkBqkHBYNGDbzw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube style={{ width: rvw(16, 20, m), height: rvw(16, 20, m) }} />
              </a>
              <a
                href="https://www.facebook.com/JoeyHouKun"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook style={{ width: rvw(16, 20, m), height: rvw(16, 20, m) }} />
              </a>
              <a
                href="https://www.instagram.com/joeyhou0804"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram style={{ width: rvw(16, 20, m), height: rvw(16, 20, m) }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}