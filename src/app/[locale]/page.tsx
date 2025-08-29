import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';

type Props = {
  params: { locale: string };
};

export default function HomePage({ params: { locale } }: Props) {
  setRequestLocale(locale);

  return (
    <div>
      <Hero />
    </div>
  );
}