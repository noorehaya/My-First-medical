// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const firebaseConfig= {
  apiKey: "AIzaSyAIchpDgj6OJJdX4oZOeN-lYxGWpZovDss",
  authDomain: "medical-form-1f891.firebaseapp.com",
  projectId:  "medical-form-1f891",
  storageBucket: "medical-form-1f891.firebasestorage.app",
  messagingSenderId: "824762590358",
  appId: "1:824762590358:web:15dcff121f45fd450dceb7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
const auth = getAuth(app); 

export { db ,auth};
