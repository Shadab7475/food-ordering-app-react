
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDa3g2anZNkwmeKUkMU76GjxXopWtXSl7U",
  authDomain: "swiggy-project-85983.firebaseapp.com",
  projectId: "swiggy-project-85983",
  storageBucket: "swiggy-project-85983.firebasestorage.app",
  messagingSenderId: "80909537465",
  appId: "1:80909537465:web:2f1a408e3eca8ca6ce4b68",
  measurementId: "G-SS3XVBDQ3C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth, provider}