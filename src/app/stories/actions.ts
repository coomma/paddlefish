
'use server';

import { z } from 'zod';
import { addStory, getDbStoryBySlug } from '@/lib/db';
import { revalidatePath } from 'next/cache';

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
  content: z.string().min(50, "Story must be at least 50 characters."),
});

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
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
  
  try {
    const slug = createSlug(title);

    // Check if a story with this slug already exists
    const existingStory = getDbStoryBySlug(slug);
    if (existingStory) {
      return {
          message: 'A story with a similar title already exists. Please choose a different title.',
          errors: { _form: ['A story with this title already exists.'] },
          success: false,
      };
    }

    const summary = content.substring(0, 150) + '...';

    // The content for the DB should be raw HTML.
    // We will wrap paragraphs in <p> tags.
    const htmlContent = '<p>' + content.replace(/\n/g, '</p><p>') + '</p>';
    
    addStory({
      slug,
      title,
      author,
      summary,
      content: htmlContent,
    });
    
    // Revalidate the stories page to show the new story
    revalidatePath('/stories', 'layout');

    return { message: 'Your story has been submitted.', success: true };
  } catch (error) {
    console.error('Error submitting story:', error);
    return {
      message: 'An unexpected error occurred.',
      errors: { _form: ['Failed to submit story. Please try again later.'] },
      success: false,
    };
  }
}
