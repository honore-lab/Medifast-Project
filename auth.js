import { auth, db } from './firebase-init.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.getElementById('registerBtn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const fullname = document.getElementById('fullname').value;
    const userType = document.getElementById('UserType').value;

    try {
        // --- DEADLINE BYPASS: Mock Local Storage Auth ---
        const mockUser = {
            uid: "mock-user-" + Date.now(),
            email: email,
            fullName: fullname,
            role: userType
        };

        // Save user session locally so your dashboard knows who is logged in
        localStorage.setItem('mediFastUser', JSON.stringify(mockUser));

        alert("Successfully registered as " + userType);
        window.location.href = "login.html"; // Or redirect straight to your dashboard page if you prefer!

    } catch (error) {
        alert("Error: " + error.message);
    }
});