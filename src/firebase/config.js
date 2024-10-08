// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKyVULpeQJ8lXk_29u-y7Mv-eUVttCpck",
  authDomain: "segudiesweb-f9b29.firebaseapp.com",
  projectId: "segudiesweb-f9b29",
  storageBucket: "segudiesweb-f9b29.appspot.com",
  messagingSenderId: "379787208178",
  appId: "1:379787208178:web:546fc04c4676e551d0776b"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app); 
export const coleccionFirebase = "productsListSegudies" 
// export const coleccionFirebase = "productsListPrueba" 


// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

