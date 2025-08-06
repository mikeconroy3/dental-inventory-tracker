// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrJ8AHMt-0cV9wZJlWaSfNq6aRT6KgrXc",
  authDomain: "dental-inventory-tracker-66662.firebaseapp.com",
  projectId: "dental-inventory-tracker-66662",
  storageBucket: "dental-inventory-tracker-66662.firebasestorage.app",
  messagingSenderId: "576711329707",
  appId: "1:576711329707:web:880377ddafbcea944a34ee",
  measurementId: "G-E75LS94P26"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Force Firestore to use long polling (fixes connection issues in some networks)
firebase.firestore().settings({
  experimentalForceLongPolling: true
});

// Initialize Firestore
const db = firebase.firestore();
