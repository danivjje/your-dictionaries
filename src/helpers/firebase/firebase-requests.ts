import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { database as db } from "@/helpers/firebase/firebase-init";
import { auth } from "@/helpers/firebase/firebase-init";
import {
  IDictionary,
  IDictionaryWord,
  IUserInformation,
} from "@/types/interfaces";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signUpUser = async (
  email: string,
  password: string
): Promise<void> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;
  await setDoc(doc(collection(db, "users", user.uid, "info")), {
    email: user.email,
  });
};

export const signInUser = async (
  email: string,
  password: string
): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async (): Promise<void> => {
  await signOut(auth);
};

export const signInUsingGoogle = async (): Promise<void> => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  const user = userCredential.user;
  await setDoc(doc(collection(db, "users", user.uid, "info")), {
    email: user.email,
  });
};

export const signInUsingGithub = async (): Promise<void> => {
  signInWithPopup(auth, githubProvider);
};

export const postDictionary = async (
  uid: string,
  dictionary: IDictionary
): Promise<string> => {
  const newDoc = await addDoc(
    collection(db, "users", uid, "dictionaries"),
    dictionary
  );

  const generatedId = newDoc.id;
  await updateDoc(doc(db, "users", uid, "dictionaries", generatedId), {
    id: generatedId,
  });
  return generatedId;
};

export const deleteDictionary = async (
  uid: string,
  dictionaryId: string
): Promise<void> => {
  await deleteDoc(doc(db, "users", uid, "dictionaries", dictionaryId));
};

export const updateDictionaryValue = async (
  uid: string,
  dictionaryId: string,
  propertyName: string,
  newValue: any
): Promise<void> => {
  updateDoc(doc(db, "users", uid, "dictionaries", dictionaryId), {
    [propertyName]: newValue,
  });
};

export const getDictionaries = async (uid: string): Promise<IDictionary[]> => {
  const dictionaries: IDictionary[] = [];
  const querySnapshot = await getDocs(
    collection(db, "users", uid, "dictionaries")
  );

  const dataLength: number = querySnapshot.size;
  if (dataLength) {
    for (let i = 0; i < dataLength; ++i) {
      const item = querySnapshot.docs[i];
      const itemData = item.data() as IDictionary;
      dictionaries.push(itemData);
    }
  }

  return dictionaries;
};

export const getUserInformation = async (
  uid: string
): Promise<IUserInformation> => {
  let information: IUserInformation = { email: "email was not recognized" };
  const querySnapshot = await getDocs(collection(db, "users", uid, "info"));

  const dataLength = querySnapshot.size;
  if (dataLength) {
    for (let i = 0; i < dataLength; ++i) {
      const item = querySnapshot.docs[i];
      const itemData = item.data() as IUserInformation;
      information = { ...information, ...itemData };
    }
  }

  return information;
};

export const getDictionary = async (
  uid: string,
  dictionaryId: string
): Promise<IDictionary> => {
  const fetchedDictionary = await getDoc(
    doc(db, "users", uid, "dictionaries", dictionaryId)
  );
  return fetchedDictionary.data() as IDictionary;
};

export const addDictionaryWord = async (
  uid: string,
  dictionaryId: string,
  newWord: IDictionaryWord
): Promise<void> => {
  const userWordsRef = doc(db, "users", uid, "dictionaries", dictionaryId);

  await updateDoc(userWordsRef, {
    words: arrayUnion(newWord),
  });
};
