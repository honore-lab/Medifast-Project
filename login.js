import { auth, db } from './firebase-init.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('LoginBtn');

    if (loginBtn) {
        loginBtn.addEventListener('click', async () => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const role = userDoc.data().role;
                    
                    // Redirect based on role
                    if (role === "medical") {
                        window.location.href = "medical-dashboard.html";
                    } else {
                        window.location.href = "index.html";
                    }
                }
            } catch (error) {
                alert("Login failed: " + error.message);
            }
        });
    }
});