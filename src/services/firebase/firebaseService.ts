import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

let app;
let auth: ReturnType<typeof getAuth> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.warn('Firebase initialization skipped. Using Demo Authentication & Local Store.', error);
  }
}

export { auth, db };

export const firebaseDemoAuth = {
  login: async (email: string, pass: string) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      uid: 'DEMO-USER-9021',
      email: email || 'farmer.demo@cropshield.ai',
      displayName: 'Murugan Ramasamy',
    };
  },
  signUp: async (name: string, email: string, pass: string) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      uid: `USER-${Date.now()}`,
      email,
      displayName: name,
    };
  },
  logout: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return true;
  }
};
