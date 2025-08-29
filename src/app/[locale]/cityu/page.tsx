import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { getCityUResources } from '@/lib/resources';
import ResourceList from '@/components/ResourceList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CityU Resources',
  description: 'Comprehensive resources for City University of Hong Kong applications',
};

type Props = {
  params: { locale: string };
};

export default function CityUPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  
  const t = useTranslations('resources');
  const resources = getCityUResources();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('cityu.title')}
          </h1>
          <p className="text-xl text-blue-100">
            {t('cityu.description')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ResourceList resources={resources} />
      </div>
    </div>
  );
}