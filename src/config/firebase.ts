import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configurazione Firebase - Le tue credenziali
const firebaseConfig = {
  apiKey: "AIzaSyAaX8Atol1K6hP8e5QP76PdjquunSKmTrc",
  authDomain: "casa-vacanze-villa-azzurra.firebaseapp.com",
  projectId: "casa-vacanze-villa-azzurra",
  storageBucket: "casa-vacanze-villa-azzurra.firebasestorage.app",
  messagingSenderId: "756120755702",
  appId: "1:756120755702:web:9cee4f27ddeed473eefbd7",
  measurementId: "G-C00SY2LH5X"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);

// Inizializza Firestore
export const db = getFirestore(app);