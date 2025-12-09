// Sign Up Page Authentication Logic

const signupForm = document.getElementById("signupForm");
const signupBtn = document.getElementById("signupBtn");
const googleSignupBtn = document.getElementById("googleSignupBtn");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const errorMsg = document.getElementById("errorMsg");

// Check if user is already logged in
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, redirect to dashboard
    window.location.href = "dashboard.html";
  }
});

// Email/Password Sign Up
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  
  // Validate passwords match
  if (password !== confirmPassword) {
    errorMsg.textContent = "Passwords do not match!";
    errorMsg.style.display = "block";
    return;
  }
  
  // Disable button and show loading state
  signupBtn.disabled = true;
  signupBtn.textContent = "Creating Account...";
  errorMsg.style.display = "none";
  
  try {
    // Create user with Firebase Authentication
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    
    // Update user profile with name
    await userCredential.user.updateProfile({
      displayName: name
    });
    
    // Success - user will be redirected by onAuthStateChanged
    console.log("Account created successfully:", userCredential.user.email);
    
  } catch (error) {
    // Handle errors
    signupBtn.disabled = false;
    signupBtn.textContent = "Create Account";
    
    let message = "Sign up failed. Please try again.";
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        message = "This email is already registered. Please log in instead.";
        break;
      case 'auth/invalid-email':
        message = "Invalid email address.";
        break;
      case 'auth/weak-password':
        message = "Password should be at least 6 characters.";
        break;
      case 'auth/operation-not-allowed':
        message = "Email/password sign up is not enabled.";
        break;
      default:
        message = error.message;
    }
    
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
    console.error("Sign up error:", error);
  }
});

// Google Sign-Up
googleSignupBtn.addEventListener("click", async () => {
  googleSignupBtn.disabled = true;
  googleSignupBtn.textContent = "Signing up...";
  errorMsg.style.display = "none";
  
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    
    // Success - user will be redirected by onAuthStateChanged
    console.log("Google sign up successful:", result.user.email);
    
  } catch (error) {
    googleSignupBtn.disabled = false;
    googleSignupBtn.innerHTML = `
      <svg style="width: 18px; height: 18px; display: inline-block; vertical-align: middle; margin-right: 8px;" viewBox="0 0 24 24">
        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Sign up with Google
    `;
    
    let message = "Google sign-up failed.";
    
    if (error.code === 'auth/popup-closed-by-user') {
      message = "Sign-up popup was closed. Please try again.";
    } else if (error.code === 'auth/popup-blocked') {
      message = "Popup was blocked by your browser. Please allow popups.";
    } else {
      message = error.message;
    }
    
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
    console.error("Google sign up error:", error);
  }
});
