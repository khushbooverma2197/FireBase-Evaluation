// Login Page Authentication Logic

const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const googleLoginBtn = document.getElementById("googleLoginBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");

// Check if user is already logged in
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, redirect to dashboard
    window.location.href = "dashboard.html";
  }
});

// Email/Password Login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  
  // Disable button and show loading state
  loginBtn.disabled = true;
  loginBtn.textContent = "Logging in...";
  errorMsg.style.display = "none";
  
  try {
    // Sign in with Firebase Authentication
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    
    // Success - user will be redirected by onAuthStateChanged
    console.log("Login successful:", userCredential.user.email);
    
  } catch (error) {
    // Handle errors
    loginBtn.disabled = false;
    loginBtn.textContent = "Login";
    
    let message = "Login failed. Please try again.";
    
    switch (error.code) {
      case 'auth/user-not-found':
        message = "No account found with this email. Please sign up first.";
        break;
      case 'auth/wrong-password':
        message = "Incorrect password. Please try again.";
        break;
      case 'auth/invalid-email':
        message = "Invalid email address.";
        break;
      case 'auth/user-disabled':
        message = "This account has been disabled.";
        break;
      case 'auth/too-many-requests':
        message = "Too many failed attempts. Please try again later.";
        break;
      default:
        message = error.message;
    }
    
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
    console.error("Login error:", error);
  }
});

// Google Sign-In
googleLoginBtn.addEventListener("click", async () => {
  googleLoginBtn.disabled = true;
  googleLoginBtn.textContent = "Signing in...";
  errorMsg.style.display = "none";
  
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    
    // Success - user will be redirected by onAuthStateChanged
    console.log("Google login successful:", result.user.email);
    
  } catch (error) {
    googleLoginBtn.disabled = false;
    googleLoginBtn.innerHTML = `
      <svg style="width: 18px; height: 18px; display: inline-block; vertical-align: middle; margin-right: 8px;" viewBox="0 0 24 24">
        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Sign in with Google
    `;
    
    let message = "Google sign-in failed.";
    
    if (error.code === 'auth/popup-closed-by-user') {
      message = "Sign-in popup was closed. Please try again.";
    } else if (error.code === 'auth/popup-blocked') {
      message = "Popup was blocked by your browser. Please allow popups.";
    } else {
      message = error.message;
    }
    
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
    console.error("Google login error:", error);
  }
});
