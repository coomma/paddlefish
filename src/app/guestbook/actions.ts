'use server';

import { z, ZodSchema } from 'zod';
import { moderateGuestbookComment } from '@/ai/flows/guestbook-comment-moderation';
import { addComment } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export type FormState = {
  message: string;
  errors?: {
    author?: string[];
    message?: string[];
    _form?: string[];
  };
  success: boolean;
};

export async function submitComment(
  prevState: FormState,
  formData: FormData,
  commentSchema: ZodSchema
): Promise<FormState> {
  const validatedFields = commentSchema.safeParse({
    author: formData.get('author'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }
  
  const { author, message } = validatedFields.data;

  try {
    const moderationResult = await moderateGuestbookComment({ comment: message });
    
    await addComment({
      author,
      message: moderationResult.moderatedComment,
      isAppropriate: moderationResult.isAppropriate,
      originalMessage: message !== moderationResult.moderatedComment ? message : undefined,
    });
    
    revalidatePath('/guestbook');
    revalidatePath('/[locale]/guestbook', 'layout');


    return { message: 'Your comment has been posted.', success: true };
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred.',
      errors: { _form: ['Failed to submit comment. Please try again.'] },
      success: false,
    };
  }
}
