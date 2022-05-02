import styled, { ThemeProvider as StyledProvider } from 'styled-components';

import './reset.css';
import './main.css';

export const Container = styled.div`
  padding: 40px 100px;
`;

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  return (
    <StyledProvider theme={{}}>
      <Container>{children}</Container>
    </StyledProvider>
  );
}
