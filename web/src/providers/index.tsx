import React, { useState } from 'react';

import { AuthProvider } from 'contexts/Auth';

import ThemeProvider from './ThemeProvider';

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  // @todo: persist login session
  const [user, setUser] = useState<null | any>('');

  return (
    <ThemeProvider>
      <AuthProvider value={{ user, setUser }}>{children}</AuthProvider>
    </ThemeProvider>
  );
}
