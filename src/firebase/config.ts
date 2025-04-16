// firebase/config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "@/firebase/firebaseConfig";

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);

// Exportamos las instancias necesarias
export const auth = getAuth(app);
export const db = getFirestore(app);
