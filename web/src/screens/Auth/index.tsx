import React, { useState, useEffect } from 'react';
import { _signInWithPhoneNumber as signInWithPhoneNumber } from 'firebaseConfig/config';
import { Container, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

const Spinner = () => (
  // Todo : Add a spinner component
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    Loading ...
  </div>
);
let authHandler : any = null;

export default function Auth() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [waitingForOtp, setWaitingForOtp] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleRequestOtp = async () => {
    const patt = new RegExp(/\+[0-9]{11}/);
    if (!patt.test(phoneNumber)) {
      // enqueueSnackbar('Error: Invalid Phone Number.Please enter your phone number as in +947XXXXXXXX.');
      console.log('Error: Invalid Phone Number.Please enter your phone number as in +947XXXXXXXX.');

    }
    try {
      setWaitingForOtp(true);
      authHandler = await signInWithPhoneNumber(phoneNumber);
      // document.getElementById('recaptcha-container')!.style.display = 'none';
      setWaitingForOtp(false);
    } catch (err) {
      setWaitingForOtp(null);
      setError(err);
      console.log(err)
      // enqueueSnackbar('Oops! Something went wrong!');
      console.log('Oops! Something went wrong!');

    }
  };

  const handleVerifyOtp = async () => {
    if (!authHandler || otp === '') return;

    const patt = new RegExp(/[0-9]{6}/);
    if (!patt.test(otp)) {
      // enqueueSnackbar('Error: Invalid OTP format. Should be six numeric digits.');
      console.log('Error: Invalid OTP format. Should be six numeric digits.');
    }

    try {
      setIsVerifying(true);
      const authResponse = await authHandler.confirm(otp);
      // authenticateUser(authResponse);
      setIsVerifying(false);
    } catch (err) {
      setIsVerifying(null);
      setError(err);
    }
  };

  useEffect(() => {
    // const captchaOrginialElm = document.getElementById('recaptcha-container');
    // if (captchaOrginialElm) {
    //   if (document.getElementById('recaptcha-wrap')) {
    //     document.getElementById('recaptcha-container')!.remove();
    //     document.getElementById('recaptcha-wrap')!.append(captchaOrginialElm);
    //   }
    // }
  }, []);

  return (
    <Container>
      <Typography>Enter your mobile number to login or register</Typography>
      <div id="recaptcha-container" />
      {waitingForOtp || (waitingForOtp === null && (
        <input
          type="text"
          placeholder="eg. +947XXXXXXXX"
          onChange={(evt) => setPhoneNumber(evt.target.value)}
        />
      ))}
      {waitingForOtp === false && (
        <input
          type="number"
          placeholder="eg. 123456"
          onChange={(evt) => setOtp(evt.target.value)}
        />
      )}
      {(waitingForOtp || isVerifying) && <Spinner />}

      {waitingForOtp === null && (
        <button disabled={phoneNumber === ''} onClick={handleRequestOtp}>
          Next
        </button>
      )}

      {waitingForOtp === false && !isVerifying && (
        <button disabled={otp === ''} onClick={handleVerifyOtp}>
          Verify
        </button>
      )}
    </Container>
  );
}
