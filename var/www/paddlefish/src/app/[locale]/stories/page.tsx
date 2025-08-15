
import { getAllStories, Story } from '@/lib/stories';
import { Link } from '@/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlusCircle } from 'lucide-react';
import { unstable_setRequestLocale } from 'next-intl/server';

export const revalidate = 0;

type StoriesPageProps = {
  params: {
    locale: string;
  };
};

export default async function StoriesPage({ params: { locale } }: StoriesPageProps) {
  unstable_setRequestLocale(locale);
  const stories = await getAllStories();

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Stories</h1>
        <p className="text-lg text-foreground/80">Recollections from the River's Edge</p>
      </header>

      <div className="mb-8 text-center">
        <Button asChild>
          <Link href="/stories/submit">
            <PlusCircle className="mr-2 h-5 w-5" />
            Submit Your Story
          </Link>
        </Button>
      </div>
      
      <div className="space-y-8">
        {stories.map((story: Story) => (
          <Card key={story.slug} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">{story.title}</CardTitle>
              <CardDescription>By {story.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90">{story.summary}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="link" className="px-0 text-accent">
                <Link href={`/stories/${story.slug}`}>
                  Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
         {stories.length === 0 && (
          <Card className="shadow-lg">
            <CardContent className="p-10 text-center">
              <p className="text-muted-foreground">No stories have been shared yet. Be the first to share a memory.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
