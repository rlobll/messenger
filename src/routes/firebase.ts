// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZf7ELcrTsxXhihjPW2CIwe8ONms_GgeU",
  authDomain: "nwitter-62d10.firebaseapp.com",
  projectId: "nwitter-62d10",
  storageBucket: "nwitter-62d10.appspot.com",
  messagingSenderId: "754454622469",
  appId: "1:754454622469:web:15f040525ce1002f28076c",
  measurementId: "G-FPYQFPLCVR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);


