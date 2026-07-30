import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXApddfOuNHUlBi_mkuFq4dUlUpWHoorM",
  authDomain: "medi-fast-890e2.firebaseapp.com",
  projectId: "medi-fast-890e2",
  storageBucket: "medi-fast-890e2.firebasestorage.app",
  messagingSenderId: "1015087315721",
  appId: "1:1015087315721:web:e8babac82dc57474b171d8",
  measurementId: "G-SW7H4JDCMZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);