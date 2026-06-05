import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAb1B6LqqTMMZnz-AY8f0ddSemWh8zZ2SE",
  authDomain: "auth-8c5ed.firebaseapp.com",
  projectId: "auth-8c5ed",
  storageBucket: "auth-8c5ed.firebasestorage.app",
  messagingSenderId: "418145065852",
  appId: "1:418145065852:web:d73d946f314b28275be2f9",
  measurementId: "G-J4V0CPSZDQ"
};

const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Analytics only if supported in the environment (avoids errors in some environments)
let analytics = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { analytics };
export default app;
