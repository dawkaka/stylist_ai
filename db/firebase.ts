// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD9Dd7WpHU_F_xhRRxUuJ55BaWOi55k2Zk",
    authDomain: "vitual-wardrobe.firebaseapp.com",
    projectId: "vitual-wardrobe",
    storageBucket: "vitual-wardrobe.appspot.com",
    messagingSenderId: "992117308618",
    appId: "1:992117308618:web:e7237335edf6e6c47b0833",
    measurementId: "G-14HRMTBSPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);