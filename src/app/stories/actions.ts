'use server';

import { z } from 'zod';
import { addStory } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from '@/navigation';

export type FormState = {
  message: string;
  errors?: {
    author?: string[];
    title?: string[];
    content?: string[];
    _form?: string[];
  };
  success: boolean;
};

const storySchema = z.object({
  author: z.string().min(2, "Name must be at least 2 characters.").max(100),
  title: z.string().min(5, "Title must be at least 5 characters.").max(200),
  content: z.string().min(50, "Story must be at least 50 characters.").max(10000),
});

function createSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
    + '-' + Date.now(); // Add timestamp for uniqueness
}


export async function submitStory(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = storySchema.safeParse({
    author: formData.get('author'),
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }
  
  const { author, title, content } = validatedFields.data;

  // Simple summary generation
  const summary = content.slice(0, 150) + '...';
  const slug = createSlug(title);

  try {
    await addStory({
      author,
      title,
      slug,
      summary,
      content: `<p>${content.replace(/\n/g, '</p><p>')}</p>`, // basic formatting
    });
    
    revalidatePath('/stories');

    // To see the success message, we can't redirect immediately.
    // The redirect will be handled on the client-side upon seeing success: true.
    return { message: 'Your story has been submitted.', success: true };
  } catch (error) {
    console.error(error);
    // Check for unique constraint error for slug
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed: stories.slug')) {
        return {
            message: 'A story with a similar title already exists. Please try a different title.',
            errors: { _form: ['A story with a similar title already exists. Please try a different title.'] },
            success: false,
        };
    }
    return {
      message: 'An unexpected error occurred.',
      errors: { _form: ['Failed to submit story. Please try again.'] },
      success: false,
    };
  }
}
