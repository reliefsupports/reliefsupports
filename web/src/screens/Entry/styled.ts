import styled from 'styled-components';

export const SingleEntryConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`;
export const LabelRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
export const Label = styled.div`
  background-color: black;
  color: white;
  font-size: 12px;
  width: fit-content;
  padding: 5px 19px;
  border-radius: 5px;
  margin: 10px;
`;
export const StatusLabel = styled.div`
  background-color: #e5e5e5;
  color: black;
  font-size: 12px;
  width: fit-content;
  padding: 5px 19px;
  border-radius: 5px;
`;
export const Div = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Author = styled.div`
  font-size: 20px;
  font-weight: 500;
  padding: 10px;
`;

export const InforBox = styled.div`
  padding: 10px;
  width: -webkit-fill-available;
`;
export const Seperator = styled.div`
  width: 3px;
  background: #c4c4c4;
`;
export const Title = styled.p`
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 10px;
`;
export const Text = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #a3a3a3;
`;

export const Icon = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 0 10px;
`;

export const CommentsArea = styled.button`
display:flex;
flex:direction:row;
margin:30px 0
`;

export const CommentsInput = styled.textarea`
  border: 1px solid black;
`;
