import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdMZviRz0YgILI8Qjc_AhPc-8CRlqYEvs",
  authDomain: "medifast-5d2f4.firebaseapp.com",
  projectId: "medifast-5d2f4",
  storageBucket: "medifast-5d2f4.firebasestorage.app",
  messagingSenderId: "516939323816",
  appId: "1:516939323816:web:f596e573458dad98d6a59d",
  measurementId: "G-78ZECXLX6W"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Add these exports so auth.js can use them
export const auth = getAuth(app);
export const db = getFirestore(app);