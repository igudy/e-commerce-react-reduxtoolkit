// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';



export const firebaseConfig = {
  apiKey: "AIzaSyDd3GNi4eIGRJfviquANPWHkGXf3pbozh0",
  authDomain: "igshop-a89b8.firebaseapp.com",
  projectId: "igshop-a89b8",
  storageBucket: "igshop-a89b8.appspot.com",
  messagingSenderId: "740321344993",
  appId: "1:740321344993:web:33892dd27ed95eb450a6a0",
  measurementId: "G-WJXZH6SH6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;