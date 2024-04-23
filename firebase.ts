import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyBIJD1IUZIlU59P5hggVJDzR-4Sg94Rkmg",
    authDomain: "todo-app-273a4.firebaseapp.com",
    projectId: "todo-app-273a4",
    storageBucket: "todo-app-273a4.appspot.com",
    messagingSenderId: "83501687082",
    appId: "1:83501687082:web:88615b44ffd2611a40be53",
    measurementId: "G-5WD07E5YL1"
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {db,storage}