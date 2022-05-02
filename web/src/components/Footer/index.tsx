import styled from 'styled-components';

export const FooterText = styled.div`
  font-size: 12px;
  text-align: left;
  margin: 20px 0;
`;

export default function Footer() {
  return (
    <FooterText>&copy; 2017-2022 &bull; ReliefSupports - Sri Lanka</FooterText>
  );
}
