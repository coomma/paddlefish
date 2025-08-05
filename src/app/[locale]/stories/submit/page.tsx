'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { submitStory, FormState } from '@/app/stories/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link } from '@/navigation';
import { ArrowLeft, ImageUp } from 'lucide-react';
import { useRouter } from '@/navigation';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit Story"}
    </Button>
  );
}

export default function SubmitStoryPage() {
  const { toast } = useToast();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const initialState: FormState = { message: '', success: false };
  const [formState, formAction] = useFormState(submitStory, initialState);

  useEffect(() => {
    if (formState.success) {
      toast({
        title: 'Thank You!',
        description: 'Your story has been submitted and will appear on the stories page.',
      });
      formRef.current?.reset();
      // Redirect to the stories page on success
      router.push('/stories');
    } else if (formState.message && formState.errors) {
       toast({
        variant: 'destructive',
        title: 'Validation Failed',
        description: formState.errors.author?.[0] || formState.errors.title?.[0] || formState.errors.content?.[0] || formState.errors._form?.[0] || 'Please check the form and try again.',
      });
    }
  }, [formState, toast, router]);


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
          <form ref={formRef} action={formAction} className="space-y-6">
            <div>
              <Label htmlFor="author" className="text-lg font-semibold">Your Name</Label>
              <Input id="author" name="author" placeholder="e.g., Jane Doe, or 'A visitor from afar'" className="mt-2" required />
               {formState.errors?.author && (
                <p className="text-sm text-destructive mt-1">{formState.errors.author[0]}</p>
              )}
            </div>
            <div>
              <Label htmlFor="title" className="text-lg font-semibold">Story Title</Label>
              <Input id="title" name="title" placeholder="A title for your story" className="mt-2" required />
               {formState.errors?.title && (
                <p className="text-sm text-destructive mt-1">{formState.errors.title[0]}</p>
              )}
            </div>
             <div>
              <Label htmlFor="picture" className="text-lg font-semibold">Upload a Picture (Optional)</Label>
              <div className="mt-2 flex items-center justify-center w-full">
                <label
                  htmlFor="picture"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-border border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageUp className="w-10 h-10 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, or GIF (Functionality coming soon)</p>
                  </div>
                  <Input id="picture" name="picture" type="file" className="hidden" accept="image/png, image/jpeg, image/gif" disabled />
                </label>
              </div>
               <p className="text-sm text-muted-foreground mt-2">Note: Image uploads are not yet functional but will be added soon.</p>
            </div>
            <div>
              <Label htmlFor="content" className="text-lg font-semibold">Your Story</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Share your memory, thoughts, or reflections here..."
                rows={10}
                className="mt-2"
                required
              />
               {formState.errors?.content && (
                <p className="text-sm text-destructive mt-1">{formState.errors.content[0]}</p>
              )}
            </div>
            <div className="text-right">
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
