// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmGev8QwCNnMdK2wLPe-CY8HLy7XLLWRk",
  authDomain: "house-marketplace-app-d34be.firebaseapp.com",
  projectId: "house-marketplace-app-d34be",
  storageBucket: "house-marketplace-app-d34be.appspot.com",
  messagingSenderId: "134615815792",
  appId: "1:134615815792:web:54ba289af7971d406d86b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()