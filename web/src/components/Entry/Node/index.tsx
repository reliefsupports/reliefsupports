import dayjs from 'dayjs';
import styled from 'styled-components';

const colorSchemes: any = {
  medicine: 'red',
  other: 'black',
};

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
  font-size: 14px;

  &:hover {
    background-color: #f2eaea;
  }
`;

export const Col = styled.div`
  padding: 5px 10px;
`;

export const ColId = styled(Col)`
  text-transform: uppercase;
  font-size: small;
  width: 25px;
  text-align: center;
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

export const toReadableDate = (dateStr: string) => {
  return dayjs(dateStr).format('MMM DD, YYYY HH:mm');
};

export default function EntryNode({ entry, onClick }: any) {
  const {
    id,
    category,
    summary,
    body,
    lastUpdatedAt,
    author,
    priority,
    status,
  } = entry;

  return (
    <Row onClick={() => onClick(entry)}>
      <ColType category={category}>{category}</ColType>
      <ColId>{id}</ColId>
      <ColDesc>
        <h4>{summary}</h4>
        <Desc dangerouslySetInnerHTML={{ __html: body }} />
        <Meta>
          <DateTime>{`At ${toReadableDate(lastUpdatedAt)} `}</DateTime>
          &bull;
          <Author>
            {` by ${author.name}`}{' '}
            {author.orgnization && (
              <span>{` on behalf of ${author.orgnization}`}</span>
            )}
          </Author>
        </Meta>
      </ColDesc>
      <ColPriority>Priority:{priority}</ColPriority>
      <ColStatus>{status}</ColStatus>
    </Row>
  );
}
