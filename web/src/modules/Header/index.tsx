import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from 'config/firebase';

import logoUrl from 'assets/images/reliefsupports-logo.png';

import {
  Container,
  Heading,
  LogoWrapper,
  Logo,
  HeaderActions,
  CreateButton,
  AuthButton,
  HeaderImage,
  PlusIcon,
} from './styled';

export default function Header({ banner = false, showActionLinks }: any) {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const isAuthenticated = !!user;

  const handleSignIn = () => {
    if (isAuthenticated) {
      signOut(auth);
      return;
    }
    navigate('/sign-in');
  };

  const handleCreate = () => navigate('/entries/create');

  return (
    <Container>
      <Heading>
        <LogoWrapper>
          <Logo
            src={logoUrl}
            alt="ReliefSupports"
            onClick={() => navigate('/')}
          />
        </LogoWrapper>

        {showActionLinks && (
          <HeaderActions>
            {/* <Select>
            <option>En</option>
            <option>Si</option>
            <option>Ta</option>
          </Select> */}

            <CreateButton onClick={handleCreate}>
              <PlusIcon /> New Entry
            </CreateButton>
            <AuthButton onClick={handleSignIn}>
              {isAuthenticated ? 'Sign Out' : 'Sign In'}
            </AuthButton>
          </HeaderActions>
        )}
      </Heading>

      {banner && <HeaderImage />}
    </Container>
  );
}
