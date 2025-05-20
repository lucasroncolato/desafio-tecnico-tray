import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxMPexjLJ8mQ0IlytB-bxHVqC8ljMYgEE",
  authDomain: "memory-game-ae2da.firebaseapp.com",
  projectId: "memory-game-ae2da",
  storageBucket: "memory-game-ae2da.firebasestorage.app",
  messagingSenderId: "423158641767",
  appId: "1:423158641767:web:dff518ac48cec73c8ad0c2",
  measurementId: "G-C0JYKKZXNS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
