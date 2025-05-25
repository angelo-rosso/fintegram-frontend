document.addEventListener("DOMContentLoaded", () => {
    // Load header partial
    fetch('/partials/header.html')
        .then(response => response.text())
        .then(html => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = html;

                // ✅ Adjust padding AFTER header is inserted
                adjustFirstSectionPadding();

                // ✅ Optional: re-adjust on window resize
                window.addEventListener("resize", adjustFirstSectionPadding);

                // ✅ Hamburger toggle logic
                const toggleBtn = document.getElementById("hamburger-toggle");
                const menu = document.getElementById("fintegram-menu");

                if (toggleBtn && menu) {
                    toggleBtn.addEventListener("click", () => {
                        menu.classList.toggle("show");
                    });
                }
            }
        });


    // Load footer (contact) partial
    fetch('/partials/contact.html')
        .then(res => res.text())
        .then(html => {
            const placeholder = document.getElementById('contact-placeholder');
            if (placeholder) {
                placeholder.innerHTML = html;

                // Now set the year AFTER the footer is inserted
                const yearEl = document.getElementById("footerYear");
                if (yearEl) {
                    yearEl.textContent = new Date().getFullYear().toString();
                }

                // ✅ NOW the form exists — bind the listener here!
                const contactForm = document.getElementById("contactForm");
                const contactSubmitBtn = document.getElementById("contactSubmitBtn");
                if (contactForm) {
                    contactForm.addEventListener("submit", async (event) => {
                        event.preventDefault();
                        showLoading(contactSubmitBtn);
                        const formData = {
                            name: contactForm.name.value.trim(),
                            email: contactForm.email.value.trim(),
                            message: contactForm.message.value.trim()
                        };

                        try {
                            const response = await fetch("/api/contact/request", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(formData)
                            });

                            const messageBox = document.getElementById("contactMessage");
                            if (messageBox) {
                                messageBox.style.display = "block";
                                if (response.ok) {
                                    messageBox.textContent = "✅ ¡Gracias por tu mensaje! Te responderemos pronto.";
                                    messageBox.style.color = "#13a8fe";
                                    contactForm.reset();
                                    resetButton(contactSubmitBtn);

                                } else {
                                    const errorText = await response.text();
                                    messageBox.textContent = `❌ Error: ${errorText}`;
                                    messageBox.style.color = "red";
                                    resetButton(contactSubmitBtn);
                                }
                            }
                        } catch (error) {
                            const messageBox = document.getElementById("contactMessage");
                            if (messageBox) {
                                messageBox.textContent = "❌ Error de red. Intenta nuevamente más tarde.";
                                messageBox.style.color = "red";
                                messageBox.style.display = "block";
                            }
                            console.error("Contact form submission error:", error);
                            resetButton(contactSubmitBtn);
                        }
                    });
                } else {
                    console.warn("❗ No se encontró el formulario de contacto");
                }
            }
        });

});

window.addEventListener("resize", adjustFirstSectionPadding);

function adjustFirstSectionPadding() {
    const header = document.querySelector("#fintegram-header");
    const firstSection = document.querySelector("#first-section");

    if (header && firstSection) {
        const headerHeight = header.offsetHeight;
        firstSection.style.paddingTop = `${headerHeight + 20}px`; // Adjust buffer if needed
    }
}

function showLoading(button) {
    button.dataset.originalText = button.textContent;
    button.textContent = 'Cargando...';
    button.classList.add('loading');
    button.disabled = true;
}

function resetButton(button) {
    button.textContent = button.dataset.originalText;
    button.classList.remove('loading');
    button.disabled = false;
}