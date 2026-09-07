import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEE_FBCfLEVgovvGbbltgtQAL18jzgzyk",
  authDomain: "marlene-s-jewelry.firebaseapp.com",
  databaseURL: "https://marlene-s-jewelry-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "marlene-s-jewelry",
  storageBucket: "marlene-s-jewelry.firebasestorage.app",
  messagingSenderId: "761899707259",
  appId: "1:761899707259:web:5ce996ccbc3fce96836bde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);,
  authDomain: "marlene-s-jewelry.firebaseapp.com",
  databaseURL:
    "https://marlene-s-jewelry-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "marlene-s-jewelry",
  storageBucket: "marlene-s-jewelry.firebasestorage.app",
  messagingSenderId: "761899707259",
  appId: "1:761899707259:web:5ce996ccbc3fce96836bde"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
