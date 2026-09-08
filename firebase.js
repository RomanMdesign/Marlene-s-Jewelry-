import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBH59uK674nj3Hhj0o1rfaFoYi2lBE1798",
  authDomain: "marlene-s-jewelry.firebaseapp.com",
  databaseURL: "https://marlene-s-jewelry-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "marlene-s-jewelry",
  storageBucket: "marlene-s-jewelry.firebasestorage.app",
  messagingSenderId: "761899707259",
  appId: "1:761899707259:web:5ce996ccbc3fce96836bde"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
