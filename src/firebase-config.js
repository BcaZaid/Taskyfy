// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4E-BqZxHWXO6v62aJszN5hKWRif8bV48",
  authDomain: "taskify-20912.firebaseapp.com",
  projectId: "taskify-20912",
  storageBucket: "taskify-20912.appspot.com",
  messagingSenderId: "641379225878",
  appId: "1:641379225878:web:a9088b28b18cb57e534037"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;