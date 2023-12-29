// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAm8K2qUPrIdkid73y2n1LermPRsE43xYg",
  authDomain: "scaletech-744ea.firebaseapp.com",
  databaseURL: "https://scaletech-744ea-default-rtdb.firebaseio.com",
  projectId: "scaletech-744ea",
  storageBucket: "scaletech-744ea.appspot.com",
  messagingSenderId: "743906748177",
  appId: "1:743906748177:web:53b4574af28a71ae438eb0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);