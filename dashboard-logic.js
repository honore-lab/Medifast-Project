import { auth, db } from './firebase-init.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { doc, getDoc, collection, getDocs, deleteDoc, query, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
// Listen for new emergency alerts
const alertsRef = collection(db, "emergencyAlerts");
const q = query(alertsRef, orderBy("timestamp", "desc"), limit(1));

onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            triggerEmergencyAlert();
        }
    });
});
onSnapshot(collection(db, "emergencyAlerts"), (snapshot) => {
    const tableBody = document.getElementById('emergencyTableBody');
    if (tableBody) {
        tableBody.innerHTML = ""; // Clear the table first

        snapshot.forEach((doc) => {
            const data = doc.data();
            // Using 'message' and 'status' to match your database fields
            tableBody.innerHTML += `
                <tr>
                    <td>${data.message || 'N/A'}</td>
                    <td>N/A</td> 
                    <td>${data.status || 'N/A'}</td>
                </tr>
            `;
        });
    }
});

function triggerEmergencyAlert() {
    // 1. Show the emergency section
    const emergencyDiv = document.getElementById('emergencySection');
    if (emergencyDiv) {
        emergencyDiv.style.display = 'block';
    }
    
    // 2. Hide intake section if it exists
    const intakeDiv = document.getElementById('intakeSection');
    if (intakeDiv) {
        intakeDiv.style.display = 'none';
    }
    
    alert("CRITICAL: New Emergency Alert Activated!");
}
// Global delete function so the HTML button can find it
window.deleteRequest = async (id) => {
    try {
        await deleteDoc(doc(db, "intakeForms", id));
        alert("Request deleted!");
        location.reload(); 
    } catch (e) {
        alert("Error deleting: " + e.message);
    }
};

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        if (userDoc.exists() && userDoc.data().role === "medical") {
            // Show the section
            document.getElementById('emergencySection').style.display = 'block';
            
            // Wait for the data to be fetched
            const querySnapshot = await getDocs(collection(db, "intakeForms"));
            const tableBody = document.getElementById('intakeTableBody');
            
            if (tableBody) {
                tableBody.innerHTML = ""; // Clear existing
                
                // If there is no data, tell the user
                if (querySnapshot.empty) {
                    tableBody.innerHTML = "<tr><td colspan='4'>No intake requests found.</td></tr>";
                } else {
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        tableBody.innerHTML += `<tr>
                            <td>${data.fullName}</td>
                            <td>${data.dob}</td>
                            <td>${data.reason}</td>
                            <td><button onclick="deleteRequest('${doc.id}')">Delete</button></td>
                        </tr>`;
                    });
                }
            }
        }
    }
});

// Add these functions at the bottom of dashboard-logic.js
window.showSection = (section) => {
    const emergencyDiv = document.getElementById('emergencySection');
    
    if (section === 'intake') {
        emergencyDiv.style.display = 'block'; // Or show specific intake table
    } else if (section === 'emergency') {
        emergencyDiv.style.display = 'none'; // Hide intake, show emergency content
        alert("Emergency protocols loaded.");
    }
};

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    }).catch((error) => {
        alert("Logout error: " + error.message);
    });
});
// 1. Unified function to show sections
window.showSection = (section) => {
    const intakeDiv = document.getElementById('intakeSection'); 
    const emergencyDiv = document.getElementById('emergencySection');

    if (section === 'intake') {
        intakeDiv.style.display = 'block';
        emergencyDiv.style.display = 'none';
    } else if (section === 'emergency') {
        intakeDiv.style.display = 'none';
        emergencyDiv.style.display = 'block';
    }
};



// 3. Keep your onSnapshot listener here (ensure it calls triggerEmergencyAlert)
// ... (your existing onSnapshot code)
// Ensure this runs only after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // Attach listeners to the buttons we just updated
    document.getElementById('intakeBtn').addEventListener('click', () => {
        showSection('intake');
    });

    document.getElementById('emergencyBtn').addEventListener('click', () => {
        showSection('emergency');
    });
});

function showSection(section) {
    const intakeDiv = document.getElementById('intakeSection');
    const emergencyDiv = document.getElementById('emergencySection');

    if (section === 'intake') {
        intakeDiv.style.display = 'block';
        emergencyDiv.style.display = 'none';
    } else if (section === 'emergency') {
        intakeDiv.style.display = 'none';
        emergencyDiv.style.display = 'block';
    }
}
