import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from 'contexts/Auth';

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

  const { user }: any = useContext(AuthContext);

  // @todo: get auth status
  const isAuthenticated = !!user;

  const handleSignIn = () => navigate('/sign-in');

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
