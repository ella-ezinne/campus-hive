import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7VREbUeMeJ_RRvU18bZ1SVcxO44dbYa8",
  authDomain: "campus-hive-99.firebaseapp.com",
  projectId: "campus-hive-99",
  storageBucket: "campus-hive-99.firebasestorage.app",
  messagingSenderId: "971731824988",
  appId: "1:971731824988:web:6144162e4af44aeb5dd199",
  measurementId: "G-Q0TTHHFPJD",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
