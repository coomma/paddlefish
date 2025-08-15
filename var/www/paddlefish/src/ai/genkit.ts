import {genkit, configureGenkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {initializeApp, getApps, getApp, FirebaseApp} from 'firebase/app';
import {firebase} from '@genkit-ai/firebase';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let anApp: FirebaseApp | null = null;
if (
  firebaseConfig.projectId &&
  !getApps().length
) {
  anApp = initializeApp(firebaseConfig);
} else if (getApps().length) {
  anApp = getApp();
}

export const app = anApp;

configureGenkit({
  plugins: [googleAI(), firebase()],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
