import styled from 'styled-components';

export const Heading = styled.div`
  display: flex;
`;

export const SignInButton = styled.button``;

export const HeaderImage = styled.div`
  background-color: #ccc;
  height: 100px;
  width: 100%;
`;

export default function Header() {
  return (
    <div>
      <Heading>
        <h1>ReliefSupports</h1>

        <select>
          <option>En</option>
          <option>Si</option>
          <option>Ta</option>
        </select>

        <SignInButton>Sign In</SignInButton>
      </Heading>
      <HeaderImage />
    </div>
  );
}
