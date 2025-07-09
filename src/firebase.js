// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxthvTZ1xY29jpZzs7cV8p88GeDYjXAQA",
  authDomain: "splity-53ee9.firebaseapp.com",
  projectId: "splity-53ee9",
  storageBucket: "splity-53ee9.firebasestorage.app",
  messagingSenderId: "338401098980",
  appId: "1:338401098980:web:9c906c793525503708c0f1",
  measurementId: "G-FCVRSQC6W4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
export { db };