import DaysSinceExtinction from '@/components/DaysSinceExtinction';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

type TimelineEvent = {
  date: string;
  description: string;
}

export default function Home({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('HomePage');
  const timelineEvents: TimelineEvent[] = t.raw('timeline');

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-2">{t('title')}</h1>
        <p className="text-lg text-foreground/80">{t('subtitle')}</p>
        <DaysSinceExtinction />
      </header>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">{t('timelineTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <div key={index}>
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="md:w-1/4">
                    <h3 className="font-headline text-xl font-semibold text-accent">{event.date}</h3>
                  </div>
                  <div className="md:w-3/4">
                    <p className="text-foreground/90 leading-relaxed">{event.description}</p>
                  </div>
                </div>
                {index < timelineEvents.length - 1 && <Separator className="mt-8" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
