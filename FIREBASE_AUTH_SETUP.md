# Firebase Authentication Setup Instructions

## 🔐 Firebase Authentication Implementation

This application now uses **Firebase Authentication** to secure access to the time tracking dashboard.

## ✅ Features Implemented

1. **Email/Password Authentication** - Users can sign up and log in with email and password
2. **Google Sign-In** - One-click authentication using Google account
3. **Protected Routes** - Only authenticated users can access the dashboard
4. **Session Management** - Automatic login state persistence
5. **Secure Logout** - Proper sign-out functionality

## 📋 Setup Instructions

### Step 1: Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `fir-app-6aa3b`
3. In the left sidebar, click **Build** → **Authentication**
4. Click **Get Started** (if not already set up)

### Step 2: Enable Authentication Methods

#### Enable Email/Password Authentication:
1. Go to **Authentication** → **Sign-in method** tab
2. Click on **Email/Password**
3. Toggle **Enable** to ON
4. Click **Save**

#### Enable Google Sign-In (Optional but Recommended):
1. In the same **Sign-in method** tab
2. Click on **Google**
3. Toggle **Enable** to ON
4. Select your support email from the dropdown
5. Click **Save**

### Step 3: Get Firebase Configuration

1. In Firebase Console, click the **gear icon** ⚙️ next to "Project Overview"
2. Select **Project settings**
3. Scroll down to **Your apps** section
4. If you don't have a web app, click **Add app** → Select **Web** (</>) icon
5. Register your app with a nickname (e.g., "Time Tracker Web")
6. Copy the `firebaseConfig` object

### Step 4: Update Configuration File

Open `firebase-config.js` and replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "fir-app-6aa3b.firebaseapp.com",
  databaseURL: "https://fir-app-6aa3b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-app-6aa3b",
  storageBucket: "fir-app-6aa3b.appspot.com",
  messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
  appId: "YOUR_ACTUAL_APP_ID"
};
```

### Step 5: Configure Security Rules (Important!)

Since users are now authenticated, you should update your Firebase Realtime Database rules to require authentication:

1. Go to **Realtime Database** → **Rules** tab
2. Update the rules to:

```json
{
  "rules": {
    "$userId": {
      ".read": "auth != null && auth.uid == $userId",
      ".write": "auth != null && auth.uid == $userId"
    }
  }
}
```

Or for simpler testing (less secure):
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

3. Click **Publish**

### Step 6: Update Database URL in Code (Optional)

If you want to store data per user, update `dashboard.js`:

```javascript
// Change from:
const BASE_URL = "https://fir-app-6aa3b-default-rtdb.asia-southeast1.firebasedatabase.app";

// To (for user-specific data):
function getUserBaseUrl() {
  return `https://fir-app-6aa3b-default-rtdb.asia-southeast1.firebasedatabase.app/users/${currentUser.uid}`;
}
```

## 🚀 Testing the Application

### Test Email/Password Authentication:

1. Open `index.html` in your browser
2. Click **Sign up** link
3. Create a new account with:
   - Full Name
   - Email
   - Password (minimum 6 characters)
4. You'll be automatically redirected to the dashboard
5. Test logout and login again

### Test Google Sign-In:

1. On the login page, click **Sign in with Google**
2. Select your Google account
3. Grant permissions
4. You'll be redirected to the dashboard

### Test Protected Routes:

1. Try accessing `dashboard.html` directly without logging in
2. You should be automatically redirected to the login page
3. This confirms the authentication guard is working

## 🔒 Security Features

- ✅ **Authentication Required**: Dashboard only accessible when logged in
- ✅ **Automatic Redirects**: Logged-in users can't access login/signup pages
- ✅ **Session Persistence**: Login state maintained across page refreshes
- ✅ **Secure Logout**: Properly clears authentication state
- ✅ **Error Handling**: User-friendly error messages for failed authentication

## 📁 Files Modified/Created

### New Files:
- `firebase-config.js` - Firebase configuration
- `auth-login.js` - Login page authentication logic
- `auth-signup.js` - Sign up page authentication logic
- `signup.html` - User registration page
- `FIREBASE_AUTH_SETUP.md` - This file

### Modified Files:
- `index.html` - Added Firebase SDK and authentication
- `dashboard.html` - Added Firebase SDK
- `dashboard.js` - Replaced localStorage with Firebase Auth

## 🐛 Troubleshooting

### Issue: "Firebase not defined"
- Make sure Firebase SDK scripts are loaded before your app scripts
- Check the order in HTML files

### Issue: Google Sign-In popup blocked
- Check browser popup blocker settings
- Allow popups for your domain

### Issue: "Auth/operation-not-allowed"
- Go to Firebase Console
- Enable the authentication method you're trying to use

### Issue: Can't access dashboard after login
- Check browser console for errors
- Verify Firebase config is correct
- Make sure database rules allow authenticated access

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify Firebase configuration is correct
3. Ensure authentication methods are enabled in Firebase Console
4. Check that database security rules allow authenticated access

---

**Note**: Remember to keep your Firebase configuration secure. Don't commit sensitive credentials to public repositories. Consider using environment variables for production deployments.
