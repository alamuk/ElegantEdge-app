import { initializeApp } from "firebase/app";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGj1pWbGkhb2EAF7O5jDzyX_GG9vqUuP8",
  authDomain: "captain-clothing-app.firebaseapp.com",
  projectId: "captain-clothing-app",
  storageBucket: "captain-clothing-app.appspot.com",
  messagingSenderId: "853122574930",
  appId: "1:853122574930:web:dff1d5a0bc6a7c084d0d8b",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

// Naming conventions we use like these because are different providers we can pull in.
// We know is Google popup, that's why we call it signInWithGooglePopup
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

// db instance to create the database or get an instance (single instance)
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "caregories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

  // const categoryMap = querySnapshot.docs;
  //     .reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();
  //
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});
  // console.log(categoryMap);
  // return categoryMap;
};

/*
{
hats: { /// main-categories ///
title: 'Hats'   /// sub-categories///
items: [  /// products details objets ///
{}'
{}
]},
//
sneakers: {
title: 'Sneakers'
items: [
{}'
{}
]},

}
 */

/**
 * Function to create a user document from user authentication.
 * We take the data that we get from the authentication service and
 * store that inside our Firestore.
 *
 * @param {object} userAuth - The user authentication object.
 * @param additionalInformation
 * @returns {object} The user document reference.
 *
 * @throws {Error} If there is an error creating the user document.
 */
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {
    displayName: "",
  },
) => {
  if (!userAuth) return;
  // Firestore getting document instance reference.
  // If we don't have that in the database then Google will generate it for us.
  // db = database, users = collection, userAuth.id = unique ID
  // The data comes as a response from the Google authentication has all these data.
  const userDocRef = doc(db, "users", userAuth.uid);

  // We get a snapshot from the user document reference.
  // Snapshot is a specific Object that has the data.
  // The snapshot allows us to check if the document exists.
  const userSnapshot = await getDoc(userDocRef);

  // check if there's an existing User document reference.
  // Check if user's data snapshot exist , Snapshot allows us to access the data.
  if (!userSnapshot.exists()) {
    // get the fields displayName and email from the userAuth Object.
    const { displayName, email } = userAuth;
    // we create this to know when the users sign in.
    const createdAt = new Date();

    try {
      // Create/set the document from userAuth in our users' collection,
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("There was an error creating the user", error.message);
    }
  }

  // user document exists.
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
