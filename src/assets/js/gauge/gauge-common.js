document.addEventListener("DOMContentLoaded", () => {
    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("fileInput");
    const gaugeContainer = document.querySelector(".gauge-container");
    const submitButton = document.querySelector("#uploadForm button[type='submit']");
    const form = document.getElementById("uploadForm");

    // Validate PDF file
    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file && file.type !== "application/pdf") {
            alert("Solo se permiten archivos PDF.");
            fileInput.value = "";
        } else {
            displayFiles([file]);
        }
    });

    // Prevent input click propagation
    fileInput.addEventListener("click", (e) => e.stopPropagation());

    // Click dropzone to open file dialog
    dropZone.addEventListener("click", (e) => {
        if (e.target !== fileInput) fileInput.click();
    });

    // Drag & drop behavior
    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("drag-over");
    });

    dropZone.addEventListener("dragleave", (e) => {
        e.preventDefault();
        dropZone.classList.remove("drag-over");
    });

    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("drag-over");
        const files = e.dataTransfer.files;
        fileInput.files = files;
        displayFiles(files);
    });

    function displayFiles(files) {
        const names = Array.from(files).map(file => file.name).join("\n");
        dropZone.textContent = names || "No se seleccionaron archivos";
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const files = fileInput.files;
        if (!files.length || files[0].type !== "application/pdf") {
            alert("Debes subir un archivo PDF válido para enviar.");
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Enviando...";

        const formData = new FormData();
        formData.append("cteFile", files[0]);

        uploadFile("/api/files/upload", async (uploadResponse) => {
            try {
                const uploadData = typeof uploadResponse === "string"
                    ? JSON.parse(uploadResponse)
                    : uploadResponse;

                if (!uploadData.success) throw new Error(uploadData.message);

                const scoringPayload = { cteFile: uploadData.fileName };
                const scoringRes = await fetch("/api/scoring/calculate-scoring", {
                    method: "POST",
                    headers: { "Content-Type": "application/json",
                                "Accept": "application/json"
                    },
                    body: JSON.stringify(scoringPayload)
                });

                const scoringData = await scoringRes.json();
                if (scoringData.fintegramScore >= 0) {
                    fillScoringData(scoringData);
                    try {
                        await fetch("/api/scoring/mark-complete", { method: "POST" });
                    } catch (markErr) {
                        console.warn("Could not mark scoring session flag", markErr);
                    }
                } else {
                    alert("Error: No se pudo obtener un puntaje de crédito válido.");
                }
            } catch (err) {
                console.error("Error:", err);
                alert("Hubo un problema: " + err.message);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = "Enviar";
            }
        }, formData);
    });

    function fillScoringData(data) {
        companyId = data.companyId;
        document.querySelector(".gauge-container .gauge-title").textContent = data.scoreStatusName || "Tu calificación:";
        document.getElementById("gauge-subtitle").textContent = data.scoreStatusDescription || "";
        gaugeContainer.style.display = "block";
        animateGauge(0, data.fintegramScore, 3000);
        form.reset();
        dropZone.textContent = "Arrastra tus archivos aquí o haz clic para seleccionarlos";
        const requestBtn = document.getElementById("requestReport");
        requestBtn.classList.remove("d-none", "btn-secondary");
        requestBtn.classList.add("btn-primary");
        requestBtn.addEventListener("click", () => {
            window.location.href = `select-report.html?companyId=${encodeURIComponent(companyId)}`;
        }, {once: true});

    }

    // Gauge drawing
    const canvas = document.getElementById("gaugeCanvas");
    const ctx = canvas.getContext("2d");
    const gaugeValueElement = document.getElementById("gaugeValue");

    function drawGauge(value) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(0.5, "yellow");
        gradient.addColorStop(1, "green");

        const radius = canvas.height - 40;
        const angle = Math.PI + (Math.PI * (value / 1000));

        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height, radius, Math.PI, 2 * Math.PI);
        ctx.lineWidth = 20;
        ctx.strokeStyle = "#e0e0e0";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height, radius, Math.PI, angle);
        ctx.lineWidth = 20;
        ctx.strokeStyle = gradient;
        ctx.stroke();

        drawNeedle(angle, radius);
        gaugeValueElement.textContent = Math.round(value);
    }

    function drawNeedle(angle, radius) {
        const x = canvas.width / 2 + Math.cos(angle) * (radius - 30);
        const y = canvas.height + Math.sin(angle) * (radius - 30);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height);
        ctx.lineTo(x, y);
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#000";
        ctx.stroke();
    }

    function animateGauge(start, end, duration) {
        const startTime = performance.now();

        function update(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const eased = start + (end - start) * (1 - Math.pow(1 - progress, 3));
            drawGauge(eased);
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }
});
