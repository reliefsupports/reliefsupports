import { ThemeProvider as StyledProvider } from 'styled-components';

import './reset.css';

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  return <StyledProvider theme={{}}>{children}</StyledProvider>;
}
