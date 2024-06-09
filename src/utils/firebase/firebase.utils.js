import { initializeApp } from 'firebase/app';

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';

// Firestore service
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  writeBatch,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDh1vHxqbNuzDsHd9C7eUaiYG8ok670h4Q',
  authDomain: 'crown-clothing-db-62cd1.firebaseapp.com',
  projectId: 'crown-clothing-db-62cd1',
  storageBucket: 'crown-clothing-db-62cd1.appspot.com',
  messagingSenderId: '624759944400',
  appId: '1:624759944400:web:084bb48ba10de775649ad5',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

// Naming conventions we use like these because are different providers we can pull in.
// We know is Google popup, that's why we call it signInWithGooglePopup
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

// db instance to create the database or get an instance (single instance)
export const db = getFirestore();

/**
 * Adds a collection of documents to a specified collection in the database.
 *
 * @param {string} collectionKey - The key of the collection where the documents will be added.
 * @param {Array} objectsToAdd - An array of objects to be added as documents in the collection.
 * @returns {Promise<void>} - A promise that resolves when the batch operation is completed.
 */
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
) => {
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);

  objectsToAdd.forEach((obj) => {
    // get document reference, collectionRef knows the database and collection.
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(docRef, obj);
  });

  await batch.commit();
  console.log('done');
};

/**
 * Retrieves categories and their corresponding documents from the Firestore database.
 *
 * @returns {Promise<Object>} A promise that resolves with an object containing the categories as keys and
 * their documents as values.
 *
 * @throws {Error} If there is an error in retrieving the categories and documents.
 */
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');

  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

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
    displayName: '',
  },
) => {
  if (!userAuth) return;
  // Firestore getting document instance reference.
  // If we don't have that in the database then Google will generate it for us.
  // db = database, users = collection, userAuth.id = unique ID
  // The data comes as a response from the Google authentication has all these data.
  const userDocRef = doc(db, 'users', userAuth.uid);

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
      console.log('There was an error creating the user', error.message);
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

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject,
    );
  });
};
