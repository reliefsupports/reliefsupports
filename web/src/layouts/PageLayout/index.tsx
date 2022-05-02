import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'modules/Header';
import Footer from 'components/Footer';

export const Link = styled.p`
  color: blue;
  cursor: pointer;
`;

type Props = {
  children: React.ReactNode;
  frontPage?: boolean;
};

export default function PageLayout({ children, frontPage = false }: Props) {
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  return (
    <div>
      <Header />

      {!frontPage && <Link onClick={handleBack}>&laquo; Back</Link>}

      <div>{children}</div>
      <Footer />
    </div>
  );
}
