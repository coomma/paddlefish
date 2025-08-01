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
import { useTranslations } from 'next-intl';
import { z } from 'zod';

type SubmitButtonProps = {
  children: React.ReactNode;
};

// We need to import `useFormStatus` in a separate client component
import { useFormStatus } from 'react-dom';

function SubmitButton({ children }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const t = useTranslations('GuestbookPage');
  return (
    <Button type="submit" disabled={pending}>
      {pending ? t('submittingButton') : children}
    </Button>
  );
}

export default function Guestbook({ initialComments }: { initialComments: Comment[] }) {
  const t = useTranslations('GuestbookPage');
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  const commentSchema = z.object({
    author: z.string().min(2, { message: t('formErrors.authorMissing') }).max(50),
    message: z.string().min(10, { message: t('formErrors.messageMissing') }).max(500),
  });

  const initialState: FormState = { message: '', success: false };
  const [formState, formAction] = useFormState(
    (prevState: FormState, formData: FormData) => submitComment(prevState, formData, commentSchema), 
    initialState
  );

  useEffect(() => {
    if (formState.success) {
      toast({
        title: 'Success!',
        description: t('successMessage'),
      });
      formRef.current?.reset();
    } else if (formState.errors?._form) {
       toast({
        variant: 'destructive',
        title: 'Error',
        description: t('unexpectedError'),
      });
    } else if (!formState.success && formState.message) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: formState.message,
      });
    }
  }, [formState, toast, t]);

  return (
    <div className="space-y-12">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{t('formTitle')}</CardTitle>
          <CardDescription>{t('formDescription')}</CardDescription>
        </CardHeader>
        <form ref={formRef} action={formAction}>
          <CardContent className="space-y-4">
            <div>
              <Input
                id="author"
                name="author"
                placeholder={t('authorPlaceholder')}
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
                placeholder={t('messagePlaceholder')}
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
            <SubmitButton>{t('submitButton')}</SubmitButton>
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-6">
        <h2 className="font-headline text-3xl text-primary text-center">{t('remembranceTitle')}</h2>
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
                    <span>{t('aiWarning')}</span>
                  </div>
                )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
