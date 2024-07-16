// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaJnA2j8WsW51FQ9JqET2Lr2276-nQ7x8",
  authDomain: "netflix-gpt-a7d65.firebaseapp.com",
  projectId: "netflix-gpt-a7d65",
  storageBucket: "netflix-gpt-a7d65.appspot.com",
  messagingSenderId: "553201042165",
  appId: "1:553201042165:web:e6cb4addc0c688f51b7bbc",
  measurementId: "G-XFQ63QZ1SM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth();