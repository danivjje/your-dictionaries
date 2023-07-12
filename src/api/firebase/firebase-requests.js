import { auth } from '@/api/firebase/firebase-init';
import {
    GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signInWithPopup, signOut
} from '@firebase/auth';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signUpUser = async (username, email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
}

export const signInUser = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => {
    signOut(auth);
}

export const signInUsingGoogle = async () => {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
}

export const signInUsingGithub = async () => {
    signInWithPopup(auth, githubProvider);
}