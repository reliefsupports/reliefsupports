import { useNavigate } from 'react-router-dom';

import {
  Heading,
  LogoWrapper,
  HeaderActions,
  SignInButton,
  Select,
  HeaderImage,
} from './styled';

export default function Header() {
  const navigate = useNavigate();

  const handleSignIn = () => navigate('/sign-in');

  return (
    <div>
      <Heading>
        <LogoWrapper>
          <h1>ReliefSupports</h1>
        </LogoWrapper>

        <HeaderActions>
          <Select>
            <option>En</option>
            <option>Si</option>
            <option>Ta</option>
          </Select>

          <SignInButton onClick={handleSignIn}>Sign In</SignInButton>
        </HeaderActions>
      </Heading>

      <HeaderImage />
    </div>
  );
}
