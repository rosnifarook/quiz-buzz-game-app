import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCgnxOKt98QH5RXU21x3k91Y_4XZOvXpss",
  authDomain: "banana-rush-game-app.firebaseapp.com",
  projectId: "banana-rush-game-app",
  storageBucket: "banana-rush-game-app.firebasestorage.app",
  messagingSenderId: "817133565794",
  appId: "1:817133565794:web:7a2eafcd11a14807cb9e3b",
  measurementId: "G-209XV9H4WE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const database = getFirestore(app);
export const analytics = getAnalytics(app);
