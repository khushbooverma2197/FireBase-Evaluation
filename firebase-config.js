// Firebase Configuration
// Get your actual API key from Firebase Console -> Project Settings -> General -> Your apps
// For project: fir-app-6aa3b

const firebaseConfig = {
  apiKey: "AIzaSyD3zEYjj2TH8nzOnlOfsx9mvfcS3UhTE-8",
  authDomain: "fir-app-6aa3b.firebaseapp.com",
  databaseURL: "https://fir-app-6aa3b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-app-6aa3b",
  storageBucket: "fir-app-6aa3b.firebasestorage.app",
  messagingSenderId: "780854755524",
  appId: "1:780854755524:web:5f84cbb1c13c8f8f794991"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export auth instance for use in other files
const auth = firebase.auth();
