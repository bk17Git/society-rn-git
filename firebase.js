// Import the functions you need from the SDKs you need
import firebase from 'firebase';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADsVEsL0rn7rbRLge8xBO6M-OfVfnMRS0",
  authDomain: "society-rn-fe1ed.firebaseapp.com",
  projectId: "society-rn-fe1ed",
  storageBucket: "society-rn-fe1ed.appspot.com",
  messagingSenderId: "319807991884",
  appId: "1:319807991884:web:03747898ca3561811584e9",
  measurementId: "G-H2V8N73LHS"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = firebase.firestore()

export {firebase, db}