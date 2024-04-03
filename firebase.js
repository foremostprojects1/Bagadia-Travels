// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC8BeWYfReiG5iN0d_X2Z8ZE3m60Q7j1M",
  authDomain: "bagadia-tours.firebaseapp.com",
  projectId: "bagadia-tours",
  storageBucket: "bagadia-tours.appspot.com",
  messagingSenderId: "461410099251",
  appId: "1:461410099251:web:78c9d67376140c70b7c346"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;