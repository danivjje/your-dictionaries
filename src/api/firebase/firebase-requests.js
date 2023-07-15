import { auth } from '@/api/firebase/firebase-init';
import {
    GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut
} from '@firebase/auth';
import router from '@/router';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signUpUser = async (username, email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
}

export const signInUser = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => {
    try {
        await signOut(auth);
        router.push({ path: 'sign-in' });
    } catch {
        console.log('error', err);
    }
}

export const signInUsingGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        router.push({ path: '/' })
    } catch (err) {
        console.log('error', err);
    }
}

export const signInUsingGithub = async () => {
    signInWithRedirect(auth, githubProvider);
}