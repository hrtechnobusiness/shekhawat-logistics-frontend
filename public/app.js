const API_URL = "https://shekhawat-logistics-backend.onrender.com";


// -----------------------------
// LOGIN
// -----------------------------
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorEl = document.getElementById("login-error");

    try {
        const cred = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = cred.user;

        const token = await user.getIdToken();
        localStorage.setItem("token", token);

        // Fetch role from Firestore via backend
        const res = await fetch(`${API_BASE}/owner/dashboard`, {
            headers: { Authorization: "Bearer " + token }
        });

        if (res.status === 200) {
            localStorage.setItem("role", "owner");
            window.location.href = "owner-dashboard.html";
            return;
        }

        const empRes = await fetch(`${API_BASE}/employee/dashboard`, {
            headers: { Authorization: "Bearer " + token }
        });

        if (empRes.status === 200) {
            localStorage.setItem("role", "employee");
            window.location.href = "employee-dashboard.html";
            return;
        }

        errorEl.innerText = "Unauthorized user";

    } catch (e) {
        errorEl.innerText = e.message;
    }
}

// -----------------------------
// AUTH HEADER
// -----------------------------
function authHeader() {
    return {
        Authorization: "Bearer " + localStorage.getItem("token"),
    };
}

// -----------------------------
// OWNER DASHBOARD LOAD
// -----------------------------
async function loadOwnerDashboard() {
    await loadComponent("sidebar", "components/sidebar.html");
    applyRoleUI("owner");

    const res = await fetch(`${API_BASE}/owner/dashboard`, {
        headers: authHeader()
    });
    const data = await res.json();

    document.getElementById("totalEmployees").innerText = data.totalEmployees;
    document.getElementById("totalParcels").innerText = data.totalParcels;
    document.getElementById("delivered").innerText = data.delivered;
    document.getElementById("pending").innerText = data.pending;
    document.getElementById("returned").innerText = data.returned;
    document.getElementById("missing").innerText = data.missing;

    loadOwnerCharts();
}

// -----------------------------
// EMPLOYEE DASHBOARD LOAD
// -----------------------------
async function loadEmployeeDashboard() {
    await loadComponent("sidebar", "components/sidebar.html");
    applyRoleUI("employee");

    const res = await fetch(`${API_BASE}/employee/dashboard`, {
        headers: authHeader()
    });
    const data = await res.json();

    document.getElementById("empTotal").innerText = data.totalAssigned;
    document.getElementById("empDelivered").innerText = data.delivered;
    document.getElementById("empPending").innerText = data.pending;
    document.getElementById("empReturned").innerText = data.returned;

    loadEmployeeCharts();
}

// -----------------------------
// AUTO LOAD BASED ON PAGE
// -----------------------------
window.onload = () => {
    if (location.pathname.includes("owner-dashboard")) {
        loadOwnerDashboard();
    }

    if (location.pathname.includes("employee-dashboard")) {
        loadEmployeeDashboard();
    }
};
