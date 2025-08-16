
'use client';

import { useFormState } from 'react-dom';
import { useEffect, useRef } from 'react';
import { submitComment, FormState } from '@/app/guestbook/actions';
import { useToast } from '@/hooks/use-toast';
import { Comment } from '@/lib/db';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Bot } from 'lucide-react';
import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
  children: React.ReactNode;
};

function SubmitButton({ children }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submitting..." : children}
    </Button>
  );
}

// Convert Comment to have Date object for formatting
type ClientComment = Omit<Comment, 'createdAt'> & {
  createdAt: Date;
};


export default function Guestbook({ initialComments }: { initialComments: ClientComment[] }) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const initialState: FormState = { message: '', success: false };
  const [formState, formAction] = useFormState(submitComment, initialState);

  useEffect(() => {
    if (formState.success) {
      toast({
        title: 'Success!',
        description: "Your comment has been posted.",
      });
      formRef.current?.reset();
    } else if (formState.errors?._form) {
       toast({
        variant: 'destructive',
        title: 'Error',
        description: "An unexpected error occurred.",
      });
    } else if (!formState.success && formState.message && (formState.errors?.author || formState.errors?.message)) {
      toast({
        variant: 'destructive',
        title: 'Validation failed',
        description: formState.errors?.author?.[0] || formState.errors?.message?.[0],
      });
    }
  }, [formState, toast]);

  return (
    <div className="space-y-12">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Leave a Comment</CardTitle>
          <CardDescription>Share your thoughts and memories.</CardDescription>
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
