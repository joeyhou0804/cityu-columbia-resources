import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import ResourceGrid from '@/components/ResourceGrid';

type Props = {
  params: { locale: string };
};

export default function HomePage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  
  const t = useTranslations('home');

  return (
    <div>
      <Hero />
      <ResourceGrid />
    </div>
  );
}