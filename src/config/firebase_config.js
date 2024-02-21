// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//provide away to authenticate a user via Google login creds
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

//invoke Firestore DB
import {getFirestore} from 'firebase/firestore';

//---------------------------------

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyDvgTp3Q-SibaNAYd-O5fFzYf-Hd0TJzG0",
  authDomain: "sr-react-expenseapp.firebaseapp.com",
  projectId: "sr-react-expenseapp",
  storageBucket: "sr-react-expenseapp.appspot.com",
  messagingSenderId: "481260563993",
  appId: "1:481260563993:web:a159ecdeef9ff6b34c4488",
  measurementId: "G-94QTPWEQ8H"

};

//-----------------------------------

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//provide and make universal config authentication info...
export const auth = getAuth(app);

//send and make universal provider for Google Authentication
export const provider = new GoogleAuthProvider();

//reference to database in code
export const db = getFirestore(app);
