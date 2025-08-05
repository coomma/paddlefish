'use server';

/**
 * @fileOverview A flow to generate an image for a story.
 *
 * - generateStoryImage - A function that generates an image based on a story summary.
 * - GenerateStoryImageInput - The input type for the generateStoryImage function.
 * - GenerateStoryImageOutput - The return type for the generateStoryImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateStoryImageInputSchema = z.object({
  summary: z.string().describe('The summary of the story to generate an image for.'),
});
export type GenerateStoryImageInput = z.infer<
  typeof GenerateStoryImageInputSchema
>;

const GenerateStoryImageOutputSchema = z.object({
  image: z.string().describe("A data URI of the generated image. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type GenerateStoryImageOutput = z.infer<
  typeof GenerateStoryImageOutputSchema
>;

export async function generateStoryImage(
  input: GenerateStoryImageInput
): Promise<GenerateStoryImageOutput> {
  return generateStoryImageFlow(input);
}

const generateStoryImageFlow = ai.defineFlow(
  {
    name: 'generateStoryImageFlow',
    inputSchema: GenerateStoryImageInputSchema,
    outputSchema: GenerateStoryImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate an artistic, symbolic, and slightly melancholic image that represents the following story summary about the extinct Chinese Paddlefish. The style should be like a watercolor painting or a pencil sketch. The image should evoke a sense of memory and loss. Do not include any text in the image.

Story Summary: ${input.summary}`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media.url) {
      throw new Error('Image generation failed.');
    }

    return { image: media.url };
  }
);
