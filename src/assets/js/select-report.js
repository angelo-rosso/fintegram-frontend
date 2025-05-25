document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const companyId = urlParams.get("companyId");

    if (!companyId) {
        alert("No se encontró el ID de la empresa.");
        return;
    }

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const rutField = document.getElementById("rutField");
    const rutInput = document.getElementById("rut");
    const reportTypeInput = document.getElementById("reportType");

    const freeBtn = document.getElementById("requestFreeReport");
    const premiumBtn = document.getElementById("requestPremiumReport");
    const form = document.getElementById("reportForm");

    // Show RUT only for premium
    rutField.style.display = "none";
    rutInput.required = false;

    // Autoformat RUT as user types
    rutInput.addEventListener("input", () => {
        rutInput.value = formatRut(rutInput.value);
    });

    // Free report logic
    if (freeBtn) {
        freeBtn.classList.remove("d-none");
        freeBtn.addEventListener("click", async (e) => {
            e.preventDefault();

            showLoading(freeBtn);

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();

            if (!name || !email) {
                alert("Por favor completa tu nombre y correo.");
                return;
            }

            const payload = {
                companyId: companyId,
                name: name,
                email: email
            };

            try {
                const response = await fetch(`/api/reports/free`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    alert(`Informe Gratuito solicitado con éxito.`);
                    resetButton(freeBtn);
                } else {
                    const error = await response.json();
                    alert("Error al solicitar el informe: " + (error.message || "Error desconocido."));
                    resetButton(freeBtn);
                }
            } catch (e) {
                console.error("Error en la solicitud:", e);
                alert("No se pudo conectar al servidor.");
                resetButton(freeBtn);
            }
            resetButton(freeBtn);
        });
    }

    // Premium report logic
    if (premiumBtn) {
        premiumBtn.classList.remove("d-none");

        premiumBtn.addEventListener("click", () => {
            reportTypeInput.value = "premium";
            rutField.style.display = "block";
            rutInput.required = true;

            form.addEventListener("submit", async function (e) {
                e.preventDefault();

                const rut = rutInput.value.trim();
                const name = nameInput.value.trim();
                const email = emailInput.value.trim();
                const reportType = reportTypeInput.value;

                if (!name || !email || !rut) {
                    alert("Por favor completa todos los campos requeridos.");
                    return;
                }

                if (!validarRut(rut)) {
                    alert("El RUT ingresado no es válido. Por favor revísalo.");
                    rutInput.focus();
                    return;
                }

                showLoading(premiumBtn);

                const payload = {
                    rut,
                    name,
                    email,
                    companyId
                };

                try {
                    const response = await fetch(``, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payload)
                    });

                    if (response.ok) {
                        const result = await response.text(); // or `.json()` depending on your backend
                        alert("Informe Premium solicitado con éxito.");
                        // window.location.href = "/success";
                    } else {
                        const error = await response.json();
                        alert("Error al solicitar el informe: " + (error.message || "Error desconocido."));
                    }

                    resetButton(premiumBtn);
                } catch (err) {
                    console.error("Error en la solicitud:", err);
                    alert("No se pudo conectar al servidor.");
                    resetButton(premiumBtn);
                }
                resetButton(premiumBtn);
            }, { once: true });
        });
    }
});

// RUT validator
function validarRut(rutCompleto) {
    rutCompleto = rutCompleto.replace(/\./g, "").replace("-", "").toUpperCase();

    if (!/^[0-9]+[0-9K]$/.test(rutCompleto)) return false;

    let rut = rutCompleto.slice(0, -1);
    let dv = rutCompleto.slice(-1);

    let suma = 0;
    let multiplo = 2;

    for (let i = rut.length - 1; i >= 0; i--) {
        suma += parseInt(rut[i]) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    let dvEsperado = 11 - (suma % 11);
    dvEsperado = dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

    return dv === dvEsperado;
}

// RUT autoformatter
function formatRut(value) {
    value = value.replace(/[^\dkK]/g, "").toUpperCase();

    let rut = value.slice(0, -1);
    let dv = value.slice(-1);

    // Add dots every 3 digits from the end
    rut = rut.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return rut + (dv ? "-" + dv : "");
}
