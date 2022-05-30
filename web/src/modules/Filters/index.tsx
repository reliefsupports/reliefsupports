import styled from 'styled-components';
import ReactSelect from 'react-select';

import { Category, Priority, Status } from 'types';

import { toOptions } from 'utils';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
  font-size: 14px;
  padding: 5px;
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

export const SearchInput = styled.input`
  border: 1px solid #ccc;
  padding: 8px 12px;
  border-radius: 5px;
  outline: none;
  width: 200px;
  margin-left: 5px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const Select = styled(ReactSelect)`
  width: 200px;
  margin-left: 5px;
`;
export const SearchItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
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
      <SearchItem>
        <label>Search:</label>
        <SearchInput
          type="text"
          placeholder="eg. (keyword)"
          value={keyword}
          onChange={(evt: any) => onChangeKeyword(evt.target.value)}
        />
      </SearchItem>
      <SearchItem>
        <label>Category:</label>
        <Select
          options={toOptions(Object.values(Category))}
          defaultValue={category && toOptions([category])[0]}
          onChange={(event: any) => onChangeCategory(event?.value)}
          isClearable
          styles={{
            menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
            menu: (provided) => ({ ...provided, zIndex: 9999 }),
          }}
        />
      </SearchItem>
      <SearchItem>
        <label>Priority:</label>
        <Select
          options={toOptions(Object.values(Priority))}
          defaultValue={priority && toOptions([priority])[0]}
          onChange={(event: any) => onChangePriority(event?.value)}
          isClearable
        />
      </SearchItem>
      <SearchItem>
        <label>Status:</label>
        <Select
          options={toOptions(Object.values(Status))}
          defaultValue={status && toOptions([status])[0]}
          onChange={(event: any) => onChangeStatus(event?.value)}
          isClearable
        />
      </SearchItem>
    </Container>
  );
}
