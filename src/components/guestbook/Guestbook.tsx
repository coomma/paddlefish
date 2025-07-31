'use client';

import { useFormState } from 'react-dom';
import { useEffect, useRef } from 'react';
import { submitComment, commentSchema, FormState } from '@/app/guestbook/actions';
import { useToast } from '@/hooks/use-toast';
import { Comment } from '@/lib/db';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Bot } from 'lucide-react';

type SubmitButtonProps = {
  children: React.ReactNode;
};

// We need to import `useFormStatus` in a separate client component
import { useFormStatus } from 'react-dom';

function SubmitButton({ children }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : children}
    </Button>
  );
}

export default function Guestbook({ initialComments }: { initialComments: Comment[] }) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  const initialState: FormState = { message: '', success: false };
  const [formState, formAction] = useFormState(submitComment, initialState);

  useEffect(() => {
    if (formState.success) {
      toast({
        title: 'Success!',
        description: formState.message,
      });
      formRef.current?.reset();
    } else if (formState.errors?._form) {
       toast({
        variant: 'destructive',
        title: 'Error',
        description: formState.errors._form[0],
      });
    }
  }, [formState, toast]);

  return (
    <div className="space-y-12">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Leave a Comment</CardTitle>
          <CardDescription>Your message will be reviewed by our AI moderator to ensure a respectful environment.</CardDescription>
        </CardHeader>
        <form ref={formRef} action={formAction}>
          <CardContent className="space-y-4">
            <div>
              <Input
                id="author"
                name="author"
                placeholder="Your Name"
                required
                aria-describedby="author-error"
                maxLength={50}
              />
              {formState.errors?.author && (
                <p id="author-error" className="text-sm text-destructive mt-1">{formState.errors.author[0]}</p>
              )}
            </div>
            <div>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message..."
                required
                rows={5}
                aria-describedby="message-error"
                maxLength={500}
              />
              {formState.errors?.message && (
                <p id="message-error" className="text-sm text-destructive mt-1">{formState.errors.message[0]}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton>Submit Comment</SubmitButton>
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-6">
        <h2 className="font-headline text-3xl text-primary text-center">Messages of Remembrance</h2>
        {initialComments.map((comment) => (
          <Card key={comment.id} className="shadow-md">
            <CardContent className="p-6">
              <p className="text-foreground/90 mb-4 leading-relaxed">"{comment.message}"</p>
              <div className="flex justify-between items-center text-sm text-foreground/60">
                <p className="font-semibold">{comment.author}</p>
                <time dateTime={comment.createdAt.toISOString()}>
                  {format(comment.createdAt, "MMMM d, yyyy")}
                </time>
              </div>
               {comment.originalMessage && (
                  <div className="mt-4 p-3 bg-secondary/50 rounded-lg text-xs text-muted-foreground flex items-start gap-2">
                    <Bot className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>This comment was automatically rewritten by AI to maintain a respectful tone.</span>
                  </div>
                )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
