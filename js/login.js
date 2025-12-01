document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const message = document.getElementById("loginMessage");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que se recargue la página

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        message.textContent = "";
        message.style.color = "red";

        // Validación de correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            message.textContent = "El correo electrónico es obligatorio.";
            return;
        }

        if (!emailRegex.test(email)) {
            message.textContent = "Correo electrónico inválido.";
            return;
        }

        // Validación de contraseña
        if (password === "") {
            message.textContent = "La contraseña es obligatoria.";
            return;
        }

        if (password.length < 6) {
            message.textContent = "La contraseña debe tener al menos 6 caracteres.";
            return;
        }

        if (/\s/.test(password)) {
            message.textContent = "La contraseña no puede tener espacios.";
            return;
        }

        // Si pasa todas las validaciones
        message.style.color = "green";
        message.textContent = "¡Inicio de sesión exitoso!";
    });
});
