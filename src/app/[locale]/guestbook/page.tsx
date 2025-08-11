import { getComments } from '@/lib/db';
import Guestbook from '@/components/guestbook/Guestbook';
import { unstable_setRequestLocale } from 'next-intl/server';

export default async function GuestbookPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const comments = await getComments();

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Guestbook</h1>
        <p className="text-lg text-foreground/80">Leave a memory or a thought for the lost giant.</p>
      </header>
      <Guestbook initialComments={comments} />
    </div>
  );
}
