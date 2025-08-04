import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link } from '@/navigation';
import { ArrowLeft } from 'lucide-react';

export default function SubmitStoryPage() {
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
          <CardTitle className="font-headline text-4xl text-primary">Share Your Story</CardTitle>
          <CardDescription>
            Did you have an encounter with the Chinese Paddlefish, or have a story or memory you'd like to share? 
            Help us build a collective memory of this magnificent creature.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-lg font-semibold">Your Name</Label>
              <Input id="name" name="name" placeholder="e.g., Jane Doe, or 'A visitor from afar'" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="title" className="text-lg font-semibold">Story Title</Label>
              <Input id="title" name="title" placeholder="A title for your story" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="story" className="text-lg font-semibold">Your Story</Label>
              <Textarea
                id="story"
                name="story"
                placeholder="Share your memory, thoughts, or reflections here..."
                rows={10}
                className="mt-2"
              />
            </div>
            <div className="text-right">
              <Button type="submit">Submit Story</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
