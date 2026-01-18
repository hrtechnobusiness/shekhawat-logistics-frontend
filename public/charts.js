// -----------------------------
// OWNER CHARTS
// -----------------------------
async function loadOwnerCharts() {

    const res = await fetch(`${API_BASE}/owner/area-summary`, {
        headers: authHeader()
    });
    const areas = await res.json();

    const labels = Object.keys(areas);
    const pending = labels.map(a => areas[a].pending);
    const missing = labels.map(a => areas[a].missing);

    // BAR CHART
    new Chart(document.getElementById("areaBarChart"), {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Pending",
                data: pending,
                backgroundColor: "#0b7dda"
            }]
        }
    });

    // PIE CHART
    new Chart(document.getElementById("missingPieChart"), {
        type: "pie",
        data: {
            labels,
            datasets: [{
                data: missing,
                backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4caf50", "#9c27b0"]
            }]
        }
    });
}

// -----------------------------
// EMPLOYEE CHARTS
// -----------------------------
function loadEmployeeCharts() {
    const ctx = document.getElementById("empTrendChart");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            datasets: [{
                label: "Deliveries",
                data: [2, 4, 6, 5, 7, 8],
                borderColor: "#0b7dda",
                fill: false
            }]
        }
    });
}
