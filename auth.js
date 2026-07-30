import { auth, db } from './firebase-init.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.getElementById('registerBtn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const fullname = document.getElementById('fullname').value;
    const userType = document.getElementById('UserType').value;

    try {
        // 1. Create account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // 2. Add extra info to Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
            fullName: fullname,
            email: email,
            role: userType
        });

        alert("Successfully registered as " + userType);
        window.location.href = "login.html"; // Redirect to login
    } catch (error) {
        alert("Error: " + error.message);
    }
});