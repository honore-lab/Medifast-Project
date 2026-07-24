import { auth } from "./firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    const currentPage = window.location.pathname;

    if (user) {
       
        if (currentPage.includes("login.html") || currentPage.includes("signup.html")) {
            window.location.href = "medical-dashboard.html";
        }
    } else {
        
        if (!currentPage.includes("login.html") && !currentPage.includes("signup.html")) {
            window.location.href = "login.html";
        }
    }
});
