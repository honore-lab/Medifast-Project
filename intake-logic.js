import { db } from './firebase-init.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Add the listener
const form = document.getElementById('intakeForm');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // This is the crucial part that stops the reload!

        const formData = {
            fullName: document.getElementById('fullName').value,
            dob: document.getElementById('dob').value,
            reason: document.getElementById('reason').value,
            timestamp: new Date()
        };

        try {
            await addDoc(collection(db, "intakeForms"), formData);
            alert("Intake submitted successfully!");
            form.reset(); 
        } catch (error) {
            alert("Error: " + error.message);
        }
    });
}