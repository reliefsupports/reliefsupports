import { useEffect, useState, useContext } from 'react';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

import styled from 'styled-components';

import { auth } from 'config/firebase';

import AuthContext from 'contexts/Auth';

export const Input = styled.input`
  border: 1px solid #ccc;
`;

export default function Auth() {
  const { user, setUser }: any = useContext(AuthContext);

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
      })
      .catch((error: any) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log('sign in failed', error);
      });
  };

  console.log(user);

  return (
    <div>
      Sign In with Phone Auth
      {!isWaitingForOtp && (
        <div>
          <div>
            Phone:
            <Input
              type="text"
              value={phone}
              placeholder="eg. +94711111111"
              onChange={(evt: any) => setPhone(evt.target.value)}
            />
          </div>
          <div id="recaptcha-container" />
          <input type="button" value="Sign In" onClick={handleSignIn} />
        </div>
      )}
      {isWaitingForOtp && (
        <div>
          <div>
            OPT:
            <Input
              type="text"
              value={otp}
              placeholder="eg. 123456"
              onChange={(evt: any) => setOtp(evt.target.value)}
            />
          </div>
          <input type="button" value="Verify" onClick={handleVerification} />
        </div>
      )}
    </div>
  );
}
