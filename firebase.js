// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZVQZO8XWR0UTPoSMLrRN7nSltUDW9Xzs",
  authDomain: "dfmpc-student-placement-system.firebaseapp.com",
  databaseURL:
    "https://dfmpc-student-placement-system-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dfmpc-student-placement-system",
  storageBucket: "dfmpc-student-placement-system.appspot.com",
  messagingSenderId: "295214875936",
  appId: "1:295214875936:web:c6574b5bd48a1652c84345",
  measurementId: "G-C2X38C34FX",
};

// Initialize Firebase
let app;
app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export {auth};
export {firebase};
export {db};

