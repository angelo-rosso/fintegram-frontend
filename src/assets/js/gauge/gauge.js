// Sidebar toggle
document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar-wrapper");
    const topbarUser = document.getElementById("topbar_user_container");

    if (topbarUser && sidebar) {
        topbarUser.addEventListener("click", () => {
            sidebar.style.display = sidebar.style.display === "none" ? "block" : "none";
        });
    }

    // Set username from localStorage
    const username = localStorage.getItem("username") || "Usuario";
    const userLabel = document.getElementById("topbar_user_label");
    if (userLabel) userLabel.textContent = username;

    // Parse `ctefile` from URL
    const cteFile = new URLSearchParams(window.location.search).get("ctefile");
    if (!cteFile) return;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "fin-auth-token": ""
        },
        body: JSON.stringify({ cteFile })
    };

    // Fetch scoring data and render gauge
    fetch("scoring", requestOptions)
        .then(response => response.json())
        .then(data => fillScoringData(data))
        .catch(err => console.error("Error fetching scoring data:", err));
});

function fillScoringData(data) {
    const username = localStorage.getItem("username") || "Usuario";
    document.getElementById("topbar_user_label").textContent = username;
    document.getElementById("title_company_name").textContent = data.clientName || "Empresa";

    const canvas = document.getElementById("gaugeCanvas");
    const ctx = canvas.getContext("2d");
    const gaugeValue = document.getElementById("gaugeValue");

    const startAngle = 0.75 * Math.PI;
    const endAngle = 2.25 * Math.PI;
    const radius = canvas.height;

    function drawGauge(value) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(0.5, "yellow");
        gradient.addColorStop(1, "green");

        const angle = startAngle + (endAngle - startAngle) * (value / 1000);

        // Base arc
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height, radius - 10, startAngle, endAngle);
        ctx.lineWidth = 20;
        ctx.strokeStyle = "#e0e0e0";
        ctx.stroke();

        // Value arc
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height, radius - 10, startAngle, angle);
        ctx.lineWidth = 20;
        ctx.strokeStyle = gradient;
        ctx.stroke();

        drawNeedle(angle);
        gaugeValue.textContent = Math.round(value);
    }

    function drawNeedle(angle) {
        const needleLength = radius - 30;
        const x = canvas.width / 2 + Math.cos(angle) * needleLength;
        const y = canvas.height + Math.sin(angle) * needleLength;

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height);
        ctx.lineTo(x, y);
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#000";
        ctx.stroke();
    }

    function animateGauge(start, end, duration) {
        const startTime = performance.now();

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = start + (end - start) * eased;
            drawGauge(value);
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    animateGauge(0, data.clientScore, 2000);
}
