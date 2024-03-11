// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1DN8-AAaT7SRWp2Z2KYBFGNrIKgiwbCQ",
  authDomain: "my-custom-project-pete.firebaseapp.com",
  projectId: "my-custom-project-pete",
  storageBucket: "my-custom-project-pete.appspot.com",
  messagingSenderId: "882317603225",
  appId: "1:882317603225:web:69c3cbeb1c06e7151d6308"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export {createUserWithEmailAndPassword}
export {signInWithEmailAndPassword}
export const db = getFirestore(app)