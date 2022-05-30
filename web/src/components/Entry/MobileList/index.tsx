import styled from 'styled-components';
 import InfiniteScroll from 'react-infinite-scroll-component';
 import { IEntry } from 'types';
 import MobileNode from '../MobileNode';

 export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  gap: 5px;
`;

 export default function MobileList({entries = [], onClick, onNext}:any){
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
              <MobileNode key={entry.id} entry={entry} onClick={onClick} />
            ))}
          </Container>
        </InfiniteScroll>
      );
 }  