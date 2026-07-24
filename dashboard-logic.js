import { auth, db } from "./firebase-init.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc, collection, getDocs, deleteDoc, query, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let isInitialLoad = true;


onSnapshot(collection(db, "emergencies"), (snapshot) => {
    const tableBody = document.getElementById('emergencyTableBody');
    if (tableBody) {
        tableBody.innerHTML = ""; 

        if (snapshot.empty) {
            tableBody.innerHTML = `<tr><td colspan="5">No emergency alerts found.</td></tr>`;
        } else {
            snapshot.forEach((docSnap) => {
                const data = docSnap.data();
                tableBody.innerHTML += `
                    <tr>
                        <td>${data.name || 'N/A'}</td>
                        <td>Emergency Active</td>
                        <td>Lat: ${data.latitude || 'N/A'}, Lng: ${data.longitude || 'N/A'}</td> 
                        <td>(Phone: ${data.phone || 'N/A'})</td>
                        <td>${data.status || 'Pending'}</td>
                        <td><button onclick="deleteEmergency('${docSnap.id}')">Delete</button></td>
                    </tr>
                `;
            });
        }
    }
});

window.deleteEmergency = async (id) => {
    try {
        await deleteDoc(doc(db, "emergencies", id));
        alert("Emergency record deleted!");
    } catch (e) {
        alert("Error deleting: " + e.message);
    }
};
   
    if (isInitialLoad) {
        isInitialLoad = false;
    } else {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                triggerEmergencyAlert();
            }
        });
    }
;

function triggerEmergencyAlert() {
    const emergencyDiv = document.getElementById('emergencySection');
    if (emergencyDiv) {
        emergencyDiv.style.display = 'block';
    }
    alert("CRITICAL: New Emergency Alert Activated!");
}

// Delete Emergency Record
window.deleteEmergency = async (id) => {
    try {
        await deleteDoc(doc(db, "emergencyAlerts", id));
        alert("Emergency record deleted!");
    } catch (e) {
        alert("Error deleting: " + e.message);
    }
};

// Delete Intake Record
window.deleteRequest = async (id) => {
    try {
        await deleteDoc(doc(db, "intakeForms", id));
        alert("Request deleted!");
    } catch (e) {
        alert("Error deleting: " + e.message);
    }
};

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().role === "medical") {
            const querySnapshot = await getDocs(collection(db, "intakeForms"));
            const tableBody = document.getElementById('intakeTableBody');

            if (tableBody) {
                tableBody.innerHTML = "";
                if (querySnapshot.empty) {
                    tableBody.innerHTML = `<tr><td colspan="4">No intake requests found.</td></tr>`;
                } else {
                    querySnapshot.forEach((docSnap) => {
                        const data = docSnap.data();
                        tableBody.innerHTML += `
                            <tr>
                                <td>${data.fullName}</td>
                                <td>${data.dob}</td>
                                <td>${data.reason}</td>
                                <td><button onclick="deleteRequest('${docSnap.id}')">Delete</button></td>
                            </tr>
                        `;
                    });
                }
            }
        }
    }
});

// Navigation Toggle
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

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('intakeBtn')?.addEventListener('click', () => {
        showSection('intake');
    });

    document.getElementById('emergencyBtn')?.addEventListener('click', () => {
        showSection('emergency');
    });

    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        signOut(auth).then(() => {
            window.location.href = "login.html";
        }).catch((error) => {
            alert("Logout error: " + error.message);
        });
    });
});