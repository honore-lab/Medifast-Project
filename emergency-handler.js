import { db } from "./firebase-init.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let userLat = null;
let userLng = null;

// 1. Make the button open the modal globally
window.activateEmergency = function() {
    const modal = document.getElementById("emergencyModal");
    if (modal) {
        modal.style.display = "flex";
    }
};

// 2. Close modal handler
document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "closeEmergencyModal") {
        document.getElementById("emergencyModal").style.display = "none";
    }
});

// 3. Get Geolocation handler
document.addEventListener("click", async (e) => {
    if (e.target && e.target.id === "getLocationBtn") {
        const statusSpan = document.getElementById("locationStatus");
        statusSpan.textContent = "Locating...";
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    userLat = position.coords.latitude;
                    userLng = position.coords.longitude;
                    statusSpan.textContent = `Location captured: ${userLat.toFixed(4)}, ${userLng.toFixed(4)}`;
                    statusSpan.style.color = "green";
                },
                (error) => {
                    statusSpan.textContent = "Unable to retrieve your location.";
                    statusSpan.style.color = "red";
                }
            );
        } else {
            statusSpan.textContent = "Geolocation is not supported by your browser.";
            statusSpan.style.color = "red";
        }
    }
});

document.addEventListener("submit", async (e) => {
    if (e.target && e.target.id === "emergencyForm") {
        e.preventDefault();
        
        const name = document.getElementById("emergencyName").value;
        const phone = document.getElementById("emergencyPhone").value;
        
        try {
            await addDoc(collection(db, "emergencies"), {
                name: name,
                phone: phone,
                latitude: userLat || "Not provided",
                longitude: userLng || "Not provided",
                timestamp: new Date().toISOString(),
                status: "Pending"
            });
            
            alert("Emergency alert sent successfully!");
            document.getElementById("emergencyModal").style.display = "none";
            e.target.reset();
            document.getElementById("locationStatus").textContent = "";
        } catch (error) {
            console.error("Error adding emergency: ", error);
            alert("Failed to send emergency alert.");
        }
    }
});
