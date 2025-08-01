import { getStoryBySlug, stories } from '@/lib/stories';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next-intl/link';

type StoryPageProps = {
  params: {
    slug: string;
    locale: string;
  };
};

export function generateStaticParams() {
  const locales = ['en', 'de', 'fr', 'ja', 'es'];
  const params: {slug: string, locale: string}[] = [];
  locales.forEach(locale => {
    stories.forEach(story => {
      params.push({ slug: story.slug, locale });
    });
  });
  return params;
}

export default function StoryPage({ params }: StoryPageProps) {
  unstable_setRequestLocale(params.locale);
  const story = getStoryBySlug(params.slug);
  const t = useTranslations('StoryPage');

  if (!story) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Button asChild variant="ghost">
            <Link href="/stories" className="flex items-center text-accent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('backToStories')}
            </Link>
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-4xl text-primary">{story.title}</CardTitle>
          <CardDescription>{t('by', {author: story.author})}</CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="prose prose-lg max-w-none text-foreground/90 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
