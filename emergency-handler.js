// Import Firestore functions
import { db } from './firebase-init.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Define the function that triggers when the button is clicked
window.activateEmergency = async () => {
    try {
        // Add a document to the 'emergencyAlerts' collection
        await addDoc(collection(db, "emergencyAlerts"), {
            status: "active",
            timestamp: serverTimestamp(),
            message: "EMERGENCY ACTIVATED: Immediate assistance required."
        });
        
        // Optional: Provide visual feedback to the patient
        alert("Emergency response team notified. Please stay calm.");
    } catch (e) {
        console.error("Error activating emergency: ", e);
        alert("Failed to send alert. Please try again.");
    }
};