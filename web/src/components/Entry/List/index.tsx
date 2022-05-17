import styled from 'styled-components';

import { IEntry } from 'types';

import EntryNode from '../Node';
import InfiniteScroll from 'react-infinite-scroll-component';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  gap: 5px;
`;

export default function EntryList({ entries = [], onClick, onNext }: any) {
  if (entries.length === 0) return <div>No entries.</div>;

  return (
    <InfiniteScroll
      dataLength={entries.length}
      next={onNext}
      hasMore
      loader={<p></p>}
    >
      <Container>
        {entries.map((entry: IEntry) => (
          <EntryNode key={entry.id} entry={entry} onClick={onClick} />
        ))}
      </Container>
    </InfiniteScroll>
  );
}
