import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return {
    title: {
      template: '%s | CityU Columbia Resources',
      default: 'CityU Columbia Resources'
    },
    description: 'Comprehensive resources for City University of Hong Kong and Columbia University applications',
    keywords: ['CityU', 'Columbia', 'University', 'Admission', 'Resources', '香港城市大学', '哥伦比亚大学'],
    authors: [{ name: 'CityU Columbia Resources' }],
    creator: 'CityU Columbia Resources',
    openGraph: {
      type: 'website',
      locale: locale,
      url: `https://www.cityucolumbia.com/${locale}`,
      title: 'CityU Columbia Resources',
      description: 'Comprehensive resources for City University of Hong Kong and Columbia University applications',
      siteName: 'CityU Columbia Resources',
    },
  };
}

export default function LocaleLayout({ children, params: { locale } }: Props) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

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