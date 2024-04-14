// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_CWmAWy7wNZ5xJKbieeM7h_MwSB8ry64",
  authDomain: "netflixgpt-cbd57.firebaseapp.com",
  projectId: "netflixgpt-cbd57",
  storageBucket: "netflixgpt-cbd57.appspot.com",
  messagingSenderId: "502131481809",
  appId: "1:502131481809:web:bae439b672c758a33f79f0",
  measurementId: "G-96F6EW73J1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();