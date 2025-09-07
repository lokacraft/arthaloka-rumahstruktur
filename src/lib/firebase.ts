// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7Sk7oMvSAzmic4Xbb-SgFPDxGGL92STk",
  authDomain: "arthaloka-rumah-struktur.firebaseapp.com",
  projectId: "arthaloka-rumah-struktur",
  storageBucket: "arthaloka-rumah-struktur.firebasestorage.app",
  messagingSenderId: "571081640012",
  appId: "1:571081640012:web:deff498dd5d3cba54e8ce9",
  measurementId: "G-MWBLWYBML8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, db, auth }