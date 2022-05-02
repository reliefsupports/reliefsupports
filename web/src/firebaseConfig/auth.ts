import firebase from './config';

const recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container');

export const signInWithPhoneNumber = (phoneNumber: string) =>
  firebase.auth().signInWithPhoneNumber(phoneNumber, recaptcha);