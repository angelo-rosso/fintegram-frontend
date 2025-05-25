//------FORMULARIO INICIO SESIÓN-------//

// Manejo del formulario de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    const username = document.getElementById('txt-user').value.trim();
    const password = document.getElementById('txt-password').value.trim();
    let valid = true;

    // Validar si el nombre de usuario está vacío
    if (!username) {
        document.getElementById('userHelp').classList.remove('d-none');
        valid = false;
    } else {
        document.getElementById('userHelp').classList.add('d-none');
    }

    // Validar si la contraseña está vacía
    if (!password) {
        document.getElementById('password-help').classList.remove('d-none');
        valid = false;
    } else {
        document.getElementById('password-help').classList.add('d-none');
    }

    // Si ambos campos son válidos, proceder
    if (valid) {
        // Validar el usuario con el backend
        // (Por ahora, almacenamos en localStorage)
        localStorage.setItem('username', username);
        localStorage.setItem('loggedIn', 'true');

        // Redirigir a la página de upload
        window.location.href = 'upload.html';
    }
});

// Evento eliminar mensaje de error usuario
document.getElementById('txt-user').addEventListener('input', function() {
    if (this.value.trim()) {
        document.getElementById('userHelp').classList.add('d-none');
    }
});

// Evento eliminar mensaje de error password
document.getElementById('txt-password').addEventListener('input', function() {
    if (this.value.trim()) {
        document.getElementById('password-help').classList.add('d-none');
    }
});

// Manejo del formulario de contacto
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Simular envío del mensaje
    document.getElementById('alert-send').classList.remove('d-none');
});




//---------FORMULARIO DE AYUDA--------//


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formulario');
    const nombreInput = document.getElementById('txt-nombre');
    const emailInput = document.getElementById('txt-email');
    const mensajeInput = document.getElementById('txt-msg');

    const nombreError = document.getElementById('nombre-help');
    const emailError = document.getElementById('email-help');
    const mensajeError = document.getElementById('msg-help');

    const alertSuccess = document.getElementById('alert-send');

    // Función para validar formato de correo electrónico
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Remover mensaje de error cuando el usuario empieza a escribir
    function removeErrorOnInput(input, errorElement) {
        input.addEventListener('input', function() {
            errorElement.textContent = '';
        });
    }

    removeErrorOnInput(nombreInput, nombreError);
    removeErrorOnInput(emailInput, emailError);
    removeErrorOnInput(mensajeInput, mensajeError);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let valid = true;

        // Validar nombre
        if (!nombreInput.value.trim()) {
            nombreError.textContent = 'Ingrese su nombre';
            valid = false;
        }

        // Validar email
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Ingrese su correo electrónico';
            valid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            emailError.textContent = 'Ingrese un correo electrónico válido';
            valid = false;
        }

        // Validar mensaje
        if (!mensajeInput.value.trim()) {
            mensajeError.textContent = 'Ingrese su mensaje';
            valid = false;
        }

        // Mostrar mensaje de éxito solo si todos los campos son válidos
        if (valid) {
            alertSuccess.classList.remove('d-none');
            form.reset();

            // Ocultar el mensaje de éxito después de 5 segundos
            setTimeout(function() {
                alertSuccess.classList.add('d-none');
            }, 5000);
        } else {
            alertSuccess.classList.add('d-none'); // Asegurar que el mensaje de éxito esté oculto si hay errores
        }
    });
});
