
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import { initializeFirebase } from '@/lib/firebase'; // Use the central firebase config

// Ensure Firebase is initialized for Genkit and other parts of the app
initializeFirebase();

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
