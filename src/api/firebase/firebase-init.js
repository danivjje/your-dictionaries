import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/api/firebase/firebase-config.js';
import { getAuth } from '@firebase/auth';

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);