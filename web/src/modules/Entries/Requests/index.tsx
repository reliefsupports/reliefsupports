import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { fetchRequests as apiFetchRequests } from 'api/entries';

import { IEntry } from 'types';

import {
  Filters,
  SearchInput,
  Select,
  List,
  Row,
  ColId,
  ColType,
  ColDesc,
  ColPriority,
  ColStatus,
  Desc,
  Meta,
  DateTime,
  Author,
  Pagination,
} from './styled';

export const toReadableDate = (dateStr: string) => {
  return dayjs(dateStr).format('MMM DD, YYYY HH:mm');
};

export default function Requests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState<any>([]);
  const [requestsFiltered, setRequestsFiltered] = useState<any>([]);
  const [type, setType] = useState('');
  const [priority, setPriority] = useState('');
  const [keyword, setKeyword] = useState('');

  const fetchRequests = async () => {
    const _requests = await apiFetchRequests();
    setRequests(_requests);
    setRequestsFiltered(_requests);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    if (!keyword) return;

    const _requests = requests.filter(({ summary, body }: any) => {
      let found = false;

      if (summary.toLowerCase().search(keyword.toLowerCase()) !== -1)
        found = true;
      if (body.toLowerCase().search(keyword.toLowerCase()) !== -1) found = true;

      return found;
    });
    setRequestsFiltered(_requests);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  useEffect(() => {
    if (!priority) return;

    const _requests = requests.filter((request: any) => {
      return priority === request.priority;
    });
    setRequestsFiltered(_requests);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priority]);

  useEffect(() => {
    if (!type) return;

    const _requests = requests.filter((request: any) => {
      return type === request.type;
    });
    setRequestsFiltered(_requests);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleClick = (entry: IEntry) =>
    navigate(`entries/${entry.id}`, { state: entry });

  return (
    <div>
      <div>
        <Filters>
          <label>Search:</label>
          <SearchInput
            type="text"
            placeholder="eg. Vitamin-C"
            value={keyword}
            onChange={(evt: any) => setKeyword(evt.target.value)}
          />

          <label>Category:</label>
          <Select
            options={[
              { value: 'Medicine', label: 'Medicine' },
              { value: 'Other', label: 'Other' },
            ]}
            defaultValue={type}
            onChange={({ value }: any) => setType(value)}
          />

          <label>Priority:</label>
          <Select
            options={[
              { value: 'High', label: 'High' },
              { value: 'Medium', label: 'Medium' },
              { value: 'Low', label: 'Low' },
            ]}
            defaultValue={priority}
            onChange={({ value }: any) => setPriority(value)}
          />
        </Filters>

        <List>
          {requestsFiltered.map((entry: IEntry) => {
            const {
              id,
              category,
              summary,
              body,
              lastUpdatedAt,
              postedBy,
              priority,
              status,
            } = entry;
            return (
              <Row key={id} onClick={() => handleClick(entry)}>
                <ColType category={category}>{category}</ColType>
                <ColId>{id}</ColId>
                <ColDesc>
                  <h4>{summary}</h4>
                  <Desc dangerouslySetInnerHTML={{ __html: body }} />
                  <Meta>
                    <DateTime>{`At ${toReadableDate(
                      lastUpdatedAt
                    )} `}</DateTime>
                    &bull;
                    <Author>
                      {` by ${postedBy.name}`}{' '}
                      {postedBy.orgnization && (
                        <span>{` on behalf of ${postedBy.orgnization}`}</span>
                      )}
                    </Author>
                  </Meta>
                </ColDesc>
                <ColPriority>Priority:{priority}</ColPriority>
                <ColStatus>{status}</ColStatus>
              </Row>
            );
          })}
        </List>

        <Pagination>
          <p>&laquo; Prev</p>
          <p>|</p>
          <p>Next &raquo;</p>
        </Pagination>
      </div>
    </div>
  );
}
