
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;

// Initialize Firebase
export function initializeFirebase() {
    if (app) {
        return app;
    }

    // During build, env vars can be undefined.
    // Check for essential config before initializing.
    if (firebaseConfig.projectId && firebaseConfig.databaseURL) {
        if (!getApps().length) {
            app = initializeApp(firebaseConfig);
        } else {
            app = getApp();
        }
        return app;
    }

    console.warn("Firebase config is missing. Skipping initialization. This is expected during build if env vars are not set.");
    return null;
}
