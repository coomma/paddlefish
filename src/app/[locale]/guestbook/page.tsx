import { getComments } from '@/lib/db';
import Guestbook from '@/components/guestbook/Guestbook';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

export default async function GuestbookPage({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  const comments = await getComments();
  const t = useTranslations('GuestbookPage');

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">{t('title')}</h1>
        <p className="text-lg text-foreground/80">{t('subtitle')}</p>
      </header>
      <Guestbook initialComments={comments} />
    </div>
  );
}
