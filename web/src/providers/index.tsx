import React, { useEffect, useState } from 'react';

import { AuthProvider } from 'contexts/Auth';

import { userSessionKey } from 'config';
import localStorage from 'utils/localStorage';

import ThemeProvider from './ThemeProvider';

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  const [user, setUser] = useState<null | any>('');

  useEffect(() => {
    const _user = localStorage.getParsed(userSessionKey);
    localStorage.set(userSessionKey, JSON.stringify(_user));
    setUser(_user);
  }, []);

  const handleSetUser = (user: null | any) => {
    if (!user) {
      localStorage.unset(userSessionKey);
    } else {
      localStorage.set(userSessionKey, JSON.stringify(user));
    }
    setUser(user);
  };

  return (
    <ThemeProvider>
      <AuthProvider value={{ user, setUser: handleSetUser }}>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
