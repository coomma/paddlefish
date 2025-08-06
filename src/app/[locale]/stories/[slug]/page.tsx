import { getStoryBySlug, getAllStories, Story } from '@/lib/stories';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from '@/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

type StoryPageProps = {
  params: {
    slug: string;
  };
};

// This allows Next.js to generate static pages for all stories at build time
export async function generateStaticParams() {
  const allStories = await getAllStories();
  return allStories.map((story) => ({
    slug: story.slug,
  }));
}

export default async function StoryPage({ params }: StoryPageProps) {
  const story = await getStoryBySlug(params.slug);

  if (!story) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Button asChild variant="ghost">
            <Link href="/stories" className="flex items-center text-accent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Stories
            </Link>
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-4xl text-primary">{story.title}</CardTitle>
          <CardDescription>By {story.author}</CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="prose prose-lg max-w-none text-foreground/90 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={story.content}
          />
        </CardContent>
      </Card>
    </div>
  );
}
