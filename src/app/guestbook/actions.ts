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

// Define the schema here, it's a server-concern
const commentSchema = z.object({
  author: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500),
});

export async function submitComment(
  prevState: FormState,
  formData: FormData
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
