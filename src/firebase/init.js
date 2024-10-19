// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzIwV1rng7dsaGFJ7Mx2i-4Ra65eLfdtI",
  authDomain: "week7-yufei.firebaseapp.com",
  projectId: "week7-yufei",
  storageBucket: "week7-yufei.appspot.com",
  messagingSenderId: "97300057974",
  appId: "1:97300057974:web:523796c6f6fcb1f715f457"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db

