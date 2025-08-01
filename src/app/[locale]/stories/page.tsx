import { stories, Story } from '@/lib/stories';
import { Link } from '@/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function StoriesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Stories</h1>
        <p className="text-lg text-foreground/80">Recollections from the River's Edge</p>
      </header>
      
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
      </div>
    </div>
  );
}
