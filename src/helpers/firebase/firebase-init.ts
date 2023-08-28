import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/helpers/firebase/firebase-config.js';
import { getAuth } from '@firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseApp = initializeApp(firebaseConfig);
export const database = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);