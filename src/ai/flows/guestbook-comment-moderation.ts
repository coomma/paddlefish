
'use server';

/**
 * @fileOverview A flow to moderate guestbook comments.
 *
 * - moderateGuestbookComment - A function that moderates guestbook comments.
 * - ModerateGuestbookCommentInput - The input type for the moderateGuestbookComment function.
 * - ModerateGuestbookCommentOutput - The return type for the moderateGuestbookComment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateGuestbookCommentInputSchema = z.object({
  comment: z.string().describe('The comment to moderate.'),
});
export type ModerateGuestbookCommentInput = z.infer<
  typeof ModerateGuestbookCommentInputSchema
>;

const ModerateGuestbookCommentOutputSchema = z.object({
  moderatedComment: z
    .string()
    .describe('The moderated comment, rewritten if necessary.'),
  isAppropriate: z
    .boolean()
    .describe('Whether the comment is appropriate or not.'),
});
export type ModerateGuestbookCommentOutput = z.infer<
  typeof ModerateGuestbookCommentOutputSchema
>;

export async function moderateGuestbookComment(
  input: ModerateGuestbookCommentInput
): Promise<ModerateGuestbookCommentOutput> {
  return moderateGuestbookCommentFlow(input);
}

const moderateGuestbookCommentPrompt = ai.definePrompt({
  name: 'moderateGuestbookCommentPrompt',
  input: {schema: ModerateGuestbookCommentInputSchema},
  output: {schema: ModerateGuestbookCommentOutputSchema},
  prompt: `You are a moderator for a guestbook on a memorial website dedicated to the extinct Chinese Paddlefish. Your task is to ensure comments are respectful and appropriate.

  Analyze the following comment and determine if it contains any inappropriate content, such as hate speech, profanity, or disrespectful language. If the comment is appropriate, return it as is. If it contains inappropriate content, rewrite the comment to be respectful and appropriate while preserving the original sentiment as much as possible.

Comment: {{{comment}}}`,
});

const moderateGuestbookCommentFlow = ai.defineFlow(
  {
    name: 'moderateGuestbookCommentFlow',
    inputSchema: ModerateGuestbookCommentInputSchema,
    outputSchema: ModerateGuestbookCommentOutputSchema,
  },
  async input => {
    const {output} = await moderateGuestbookCommentPrompt(input);
    return output!;
  }
);
