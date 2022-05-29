import styled from 'styled-components';

import Button from 'components/Button';
import { PlusIcon as PlusIconSource } from 'assets/icons';

export const Container = styled.div`
  margin: 0 0 40px;
`;

export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoWrapper = styled.div`
  padding :10px;
`;

export const Logo = styled.img`
  cursor: pointer;
  @media screen and (max-width: 768px){
    width:90px;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const CreateButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  @media screen and (max-width: 768px){
    min-width: 90px;
    height: 26px;
    width: fit-content;
    font-size: 11px;
  }
`;

export const AuthButton = styled(Button)`
  background: #000000;
  color: #fff;
  @media screen and (max-width: 768px){
    min-width: 90px;
    height: 26px;
    font-size: 11px;
     }
`;

// export const Select = styled.select`
//   outline: none;
//   font-weight: bold;
// `;

export const HeaderImage = styled.div`
  background-color: #e5e5e5;
  height: 338px;
  width: 100%;
`;

export const PlusIcon = styled(PlusIconSource)`
  width: 16px;
`;
