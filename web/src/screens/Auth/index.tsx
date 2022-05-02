import React, { useState, useEffect } from 'react';
import { signInWithPhoneNumber } from 'firebaseConfig/auth';

const Spinner = () => (
  // Todo : Add a spinner component
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    Loading ...
  </div>
);

export default function Auth() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [waitingForOtp, setWaitingForOtp] = useState(null);
  const [isVerifying, setIsVerifying] = useState(null);
  const [error, setError] = useState(null);


  return (
  <div>Sign In with Phone Auth</div>
  );
}
