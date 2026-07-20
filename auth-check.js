// auth-check.js

// This runs automatically whenever the user's login state changes
firebase.auth().onAuthStateChanged((user) => {
    // Get the current page filename
    const currentPage = window.location.pathname;

    if (user) {
        // USER IS LOGGED IN
        // If they are on the login/signup page, move them to the dashboard
        if (currentPage.includes("login.html") || currentPage.includes("signup.html")) {
            window.location.href = "medical-dashboard.html";
        }
    } else {
        // USER IS NOT LOGGED IN
        // If they are NOT on the login/signup page, force them to login
        if (!currentPage.includes("login.html") && !currentPage.includes("signup.html")) {
            window.location.href = "login.html";
        }
    }
});