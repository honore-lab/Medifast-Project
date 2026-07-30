// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBXApddf0uNHUlBi_mkuFq4dUlUPwHoorM",
    authDomain: "medi-fast-890e2.firebaseapp.com",
    projectId: "medi-fast-890e2",
    storageBucket: "medi-fast-890e2.firebasestorage.app",
    messagingSenderId: "1015087315721",
    appId: "1:1015087315721:web:e8babac82dc57474b171d8",
    measurementId: "G-SW7H4JDCMZ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
