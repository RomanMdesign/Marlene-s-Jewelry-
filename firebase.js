import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "marlene-s-jewelry.firebaseapp.com",
  projectId: "marlene-s-jewelry",
  storageBucket: "marlene-s-jewelry.firebasestorage.app",
  messagingSenderId: "761899707259",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
