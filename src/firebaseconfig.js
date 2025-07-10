// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
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
  appId: "1:338401098980:web:430baf30b676168808c0f1",
  measurementId: "G-B7PZSK41SG"
};

console.log("🔥 Firebase projectId =", firebaseConfig.projectId);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };