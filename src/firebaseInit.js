// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvVDzEs-wOlkpVZfxdZViW0-vqsKqmZSo",
  authDomain: "vue-sam-prosody1.firebaseapp.com",
  projectId: "vue-sam-prosody1",
  storageBucket: "vue-sam-prosody1.appspot.com",
  messagingSenderId: "643106112068",
  appId: "1:643106112068:web:fa8e20e36959dede0f7211",
  measurementId: "G-ZKWDRRZCGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app as firebaseApp, auth};
