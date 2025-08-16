
import { getComments } from '@/lib/db';
import Guestbook from '@/components/guestbook/Guestbook';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Mail } from 'lucide-react';

export default function GuestbookPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const comments = getComments();

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Guestbook</h1>
        <p className="text-lg text-foreground/80">Leave a memory or a thought for the lost giant.</p>
         <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>Contact us: coomma.com@gmail.com</span>
        </div>
      </header>
      <Guestbook initialComments={comments} />
    </div>
  );
}
