import styled from 'styled-components';

import { IEntry } from 'types';

import EntryNode from '../Node';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
  gap: 5px;
`;

export default function EntryList({ entries, onClick }: any) {
  return (
    <Container>
      {entries.map((entry: IEntry) => (
        <EntryNode key={entry.id} entry={entry} onClick={onClick} />
      ))}
    </Container>
  );
}
