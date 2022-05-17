import styled from 'styled-components';
import ReactSelect from 'react-select';

import { Category, Priority, Status } from 'types';

import { toOptions } from 'utils';

export const Container = styled.div`
  padding: 5px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
  font-size: 14px;
  padding: 5px;
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

export default function Filters({
  keyword,
  category,
  priority,
  status,
  onChangeKeyword,
  onChangeCategory,
  onChangePriority,
  onChangeStatus,
}: any) {
  return (
    <Container>
      <label>Search:</label>
      <SearchInput
        type="text"
        placeholder="eg. (keyword)"
        value={keyword}
        onChange={(evt: any) => onChangeKeyword(evt.target.value)}
      />

      <label>Category:</label>
      <Select
        options={toOptions(Object.values(Category))}
        defaultValue={category && toOptions([category])[0]}
        onChange={(event: any) => onChangeCategory(event?.value)}
        isClearable
      />

      <label>Priority:</label>
      <Select
        options={toOptions(Object.values(Priority))}
        defaultValue={priority && toOptions([priority])[0]}
        onChange={(event: any) => onChangePriority(event?.value)}
        isClearable
      />

      <label>Status:</label>
      <Select
        options={toOptions(Object.values(Status))}
        defaultValue={status && toOptions([status])[0]}
        onChange={(event: any) => onChangeStatus(event?.value)}
        isClearable
      />
    </Container>
  );
}
