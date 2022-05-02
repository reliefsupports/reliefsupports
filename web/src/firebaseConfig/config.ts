import firebase from 'firebase/compat/app';
import { getAuth,  signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth"
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
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);


export const _signInWithPhoneNumber = async (phoneNumber: string) => {
  const recaptcha = new RecaptchaVerifier('recaptcha-container', {}, auth);
  recaptcha.render();
  return signInWithPhoneNumber(auth, phoneNumber, recaptcha);
}

export default firebase;