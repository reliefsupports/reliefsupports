import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA4Y9idOdw-LAKX9U_CXI2wwU-nLzlIWVQ",
    authDomain: "reliefsupports.firebaseapp.com",
    projectId: "reliefsupports",
    storageBucket: "reliefsupports.appspot.com",
    messagingSenderId: "1020541865608",
    appId: "1:1020541865608:web:18d71087ddd02c14f2993d",
    measurementId: "G-D69Z4PS9NJ"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;