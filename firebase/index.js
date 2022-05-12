
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './config'

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);


const firestore = getFirestore(firebase);
const fs_auth = getAuth(firebase);

export { firebase, firestore, fs_auth }