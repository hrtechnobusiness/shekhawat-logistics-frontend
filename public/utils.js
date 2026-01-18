// -----------------------------
// LOAD COMPONENT (SIDEBAR / TOPBAR)
// -----------------------------
async function loadComponent(id, file) {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
}

// -----------------------------
// ROLE BASED SIDEBAR CONTROL
// -----------------------------
function applyRoleUI(role) {
    document.querySelectorAll("[data-role]").forEach(el => {
        if (el.dataset.role !== role) {
            el.style.display = "none";
        }
    });

    const roleSpan = document.getElementById("topbarRole");
    if (roleSpan) roleSpan.innerText = role.toUpperCase();
}

// -----------------------------
// LOGOUT
// -----------------------------
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}
