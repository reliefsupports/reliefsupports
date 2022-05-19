import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

import styled from 'styled-components';

import { auth } from 'config/firebase';

import AuthContext from 'contexts/Auth';

import PageLayout from 'layouts/PageLayout';
import TextInput from 'components/TextInput';
import Button from 'components/Button';

export const Input = styled.input`
  border: 1px solid #ccc;
`;

export default function Auth() {
  const navigate = useNavigate();
  const { setUser }: any = useContext(AuthContext);

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isWaitingForOtp, setIsWaitingForOtp] = useState(false);

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'normal',
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
          console.log('reCAPTCHA-solved', response);
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
          console.log('reCAPTCHA-expired');
        },
      },
      auth
    );
  }, []);

  const handleSignIn = () => {
    signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
      .then((confirmationResult) => {
        console.log('SMS sent', confirmationResult);
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
        setIsWaitingForOtp(true);
      })
      .catch((error) => {
        console.log('SMS not sent', error);
        // Error; SMS not sent
        // ...
        // window.recaptchaVerifier.render().then(function(widgetId: string) {
        //   grecaptcha.reset(widgetId);
        // });
      });
  };

  const handleVerification = () => {
    if (!window.confirmationResult) return;

    window.confirmationResult
      .confirm(otp)
      .then((result: any) => {
        // User signed in successfully.
        console.log('signed', result.user);
        // ...
        setUser(result);
        navigate('/');
      })
      .catch((error: any) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log('sign in failed', error);
      });
  };

  return (
    <PageLayout minimalView>
      <h3>Sign In</h3>

      {!isWaitingForOtp && (
        <div>
          <TextInput
            label="Phone Number"
            value={phone}
            placeholder="eg. +94711111111"
            onChange={(evt: any) => setPhone(evt.target.value)}
          />
          <div id="recaptcha-container" />
          <Button onClick={handleSignIn}>Request OTP</Button>
        </div>
      )}

      {isWaitingForOtp && (
        <div>
          <TextInput
            label="OTP"
            value={otp}
            placeholder="eg. 123456"
            onChange={(evt: any) => setOtp(evt.target.value)}
          />
          <Button onClick={handleVerification}>Verify &amp; Login</Button>
        </div>
      )}
    </PageLayout>
  );
}
