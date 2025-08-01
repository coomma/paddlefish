import { getComments } from '@/lib/db';
import Guestbook from '@/components/guestbook/Guestbook';

export default async function GuestbookPage() {
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
