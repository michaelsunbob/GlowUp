// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZzStYNtHWmNmXMyOKYebl4cPv2TN8kJo",
  authDomain: "react-550c0.firebaseapp.com",
  projectId: "react-550c0",
  storageBucket: "react-550c0.appspot.com",
  messagingSenderId: "646908889125",
  appId: "1:646908889125:web:a1af917b9a1883436917cc",
  measurementId: "G-LPJ8WQFLE0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const storage = getStorage(app)