// Firebase imports (keep at top)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCgKhPGFs2GX4CbFcaRU3rbNN2XYKRvAv0",
  authDomain: "career-guidance-app-d2978.firebaseapp.com",
  projectId: "career-guidance-app-d2978",
  storageBucket: "career-guidance-app-d2978.firebasestorage.app",
  messagingSenderId: "877437959894",
  appId: "1:877437959894:web:1551cbd6b7d849413d1377"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Wait for DOM to load
window.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const signupBtn = document.getElementById('signup');
  const loginBtn = document.getElementById('login');
  const messageDiv = document.getElementById('message');

  signupBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        messageDiv.textContent = "Sign Up Successful!";
        console.log(`User signed up: ${email}`);
        setTimeout(() => { window.location.href = "dashboard.html"; }, 300);
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          messageDiv.textContent = "This email is already registered. Please log in.";
        } else if (error.code === 'auth/invalid-email') {
          messageDiv.textContent = "Invalid email address.";
        } else if (error.code === 'auth/weak-password') {
          messageDiv.textContent = "Password should be at least 6 characters.";
        } else {
          messageDiv.textContent = "Error: " + error.message;
        }
        console.log(`Sign Up Error for ${email}: ${error.message}`);
      });
  });

  loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        messageDiv.textContent = "Login Successful!";
        console.log(`User logged in: ${email}`);
        setTimeout(() => { window.location.href = "dashboard.html"; }, 300);
      })
      .catch((error) => {
        messageDiv.textContent = "Error: " + error.message;
        console.log(`Login Error for ${email}: ${error.message}`);
      });
  });
});

