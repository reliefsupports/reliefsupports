import styled from 'styled-components';
import ReactSelect from 'react-select';

const colorSchemes: any = {
  Medicine: 'red',
  Other: 'black',
};

export const Filters = styled.div`
  padding: 5px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

export const SearchInput = styled.input`
  border: 1px solid #ccc;
  padding: 8px 12px;
  border-radius: 5px;
  outline: none;
  width: 300px;
`;

export const Select = styled(ReactSelect)`
  width: 150px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
  gap: 5px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f2eaea;
  }
`;

export const Col = styled.div`
  padding: 5px 10px;
`;

export const ColId = styled(Col)`
  width: 10px;
`;

export const ColType = styled(Col)<{ category: string }>`
  padding: 0;
  background-color: ${(props) => colorSchemes[props.category]};
  width: 8px;
  font-size: 0;
`;

export const ColDesc = styled(Col)`
  flex: 1;
`;

export const ColPriority = styled(Col)``;

export const ColStatus = styled(Col)``;

export const Desc = styled.div`
  margin: 2px 0;
`;

export const Meta = styled.div`
  margin: 5px 0;
  font-size: small;
  color: gray;
`;

export const DateTime = styled.span``;

export const Author = styled.span``;

export const Location = styled.span``;

export const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
