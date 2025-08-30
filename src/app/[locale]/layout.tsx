import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  // Localized content for each language
  const localizedContent = {
    en: {
      title: 'CityU Columbia Resources - Application Guides & Admission Materials',
      description: 'Free admission guides, application materials, and video tutorials for the Joint Bachelors Program between City University of Hong Kong and Columbia University.',
      siteName: 'CityU Columbia Resources',
      templateSuffix: 'CityU Columbia Resources',
      keywords: ['CityU Columbia', 'Joint Bachelors Program', 'City University Hong Kong Columbia', 'CityU admission', 'Columbia admission', 'dual degree application', 'university application guide']
    },
    'zh-cn': {
      title: '城大-哥大资源库——报读手册与申请资料',
      description: '香港城市大学与哥伦比亚大学双联学士学位项目的免费报读手册、申请资料和视频分享。',
      siteName: '城大-哥大资源库',
      templateSuffix: '城大-哥大资源库',
      keywords: ['城大哥大', '香港城市大学', '哥伦比亚大学', '双联学士学位', '报读手册', '申请资料', '双学位申请', '大学申请指南']
    },
    'zh-hk': {
      title: '城大-哥大資源庫——報讀手冊與申請資料',
      description: '香港城市大學與哥倫比亞大學雙聯學士學位項目的免費報讀手冊、申請資料和影片分享。',
      siteName: '城大-哥大資源庫',
      templateSuffix: '城大-哥大資源庫',
      keywords: ['城大哥大', '香港城市大學', '哥倫比亞大學', '雙聯學士學位', '報讀手冊', '申請資料', '雙學位申請', '大學申請指南']
    }
  };

  const content = localizedContent[locale as keyof typeof localizedContent] || localizedContent.en;

  return {
    metadataBase: new URL('https://www.cityucolumbia.com'),
    title: {
      template: `%s | ${content.templateSuffix}`,
      default: content.title
    },
    description: content.description,
    keywords: content.keywords,
    authors: [{ name: 'CityU Columbia Students' }],
    creator: 'CityU Columbia Joint Bachelors Program Students',
    icons: {
      icon: '/favicon.png',
      shortcut: '/favicon.png',
      apple: '/favicon.png',
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: `/${locale}`,
      title: content.title,
      description: content.description,
      siteName: content.siteName,
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: content.siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function LocaleLayout({ children, params: { locale } }: Props) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}