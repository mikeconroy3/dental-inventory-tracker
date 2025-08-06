// Replace these values with your Firebase project settings
const firebaseConfig = {
  apiKey: "AIzaSyBrJ8AHMt-0cV9wZJlWaSfNq6aRT6KgrXc",
  authDomain: "dental-inventory-tracker-66662.firebaseapp.com",
  projectId: "dental-inventory-tracker-66662",
  storageBucket: "dental-inventory-tracker-66662.firebasestorage.app",
  messagingSenderId: "576711329707",
  appId: "1:576711329707:web:880377ddafbcea944a34ee"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
