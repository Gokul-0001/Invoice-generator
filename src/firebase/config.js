import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBj8j9fJctyeN7fNeRsiWr0k_03y4Hj9p0",
    authDomain: "invoice-generator-5b82b.firebaseapp.com",
    projectId: "invoice-generator-5b82b",
    storageBucket: "invoice-generator-5b82b.firebasestorage.app",
    messagingSenderId: "704247149193",
    appId: "1:704247149193:web:c8d8b029f1d1f3a02b8c58",
    measurementId: "G-3F81MT6HV8"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
