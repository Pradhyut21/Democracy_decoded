import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "mock-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mock-domain",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mock-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mock-bucket",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "mock-sender",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "mock-app"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function saveQuizResult(score: number, total: number) {
  if (import.meta.env.VITE_FIREBASE_API_KEY === "mock-key" || !import.meta.env.VITE_FIREBASE_API_KEY) {
    console.log("Firebase not configured, skipping result save.");
    return;
  }
  
  try {
    await addDoc(collection(db, "quiz_results"), {
      score,
      total,
      timestamp: serverTimestamp(),
    });
  } catch (e) {
    console.error("Error saving quiz result: ", e);
  }
}
