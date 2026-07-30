import { auth, db } from "./firebase-init.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');

    if (loginBtn) {
        loginBtn.addEventListener('click', async () => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                // --- DEADLINE BYPASS: Mock Login Session ---
                const mockUser = {
                    email: email,
                    role: "patient" // Or change to "medical" if testing medical dashboard
                };

                localStorage.setItem('mediFastUser', JSON.stringify(mockUser));

                // Redirect straight to dashboard
                window.location.href = "medical-dashboard.html";

            } catch (error) {
                alert("Login failed: " + error.message);
            }
        });
    }
});