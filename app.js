// Simple localStorage-based authentication
document.addEventListener("DOMContentLoaded", () => {
    const signupBtn = document.getElementById("signup");
    const loginBtn = document.getElementById("login");

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const message = document.getElementById("message");

    // SIGNUP
    signupBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            message.textContent = "Please fill all fields.";
            message.style.color = "red";
            return;
        }

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem("users")) || {};
        if (users[email]) {
            message.textContent = "Email already registered. Please login.";
            message.style.color = "red";
            return;
        }

        // Save user
        users[email] = { password };
        localStorage.setItem("users", JSON.stringify(users));

        // Store current user
        localStorage.setItem("currentUser", JSON.stringify({ email }));

        // Clear inputs
        emailInput.value = "";
        passwordInput.value = "";

        // Redirect silently
        window.location.href = "dashboard.html";
    });

    // LOGIN
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        const users = JSON.parse(localStorage.getItem("users")) || {};

        if (!users[email] || users[email].password !== password) {
            message.textContent = "Invalid email or password.";
            message.style.color = "red";
            return;
        }

        // Store current user
        localStorage.setItem("currentUser", JSON.stringify({ email }));

        // Clear inputs
        emailInput.value = "";
        passwordInput.value = "";

        // Redirect silently
        window.location.href = "dashboard.html";
    });
});
