import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'modules/Header';
import Footer from 'components/Footer';

export const Link = styled.p`
  color: blue;
  cursor: pointer;
`;

export const Box = styled.div`
 padding :10px;
`

type Props = {
  children: React.ReactNode;
  frontPage?: boolean;
  minimalView?: boolean;
};

export default function PageLayout({
  children,
  frontPage = false,
  minimalView = false,
}: Props) {
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  return (
    <Box>
      <Header showActionLinks={!minimalView} />

      {!frontPage && !minimalView && (
        <Link onClick={handleBack}>&laquo; Back</Link>
      )}

      <div>{children}</div>
      <Footer showDisclaimer={!minimalView} />
    </Box>
  );
}
