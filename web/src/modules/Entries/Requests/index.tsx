import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import requestsData from 'data/requests.json';

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
} from './styled';

enum Type {
  Medicine = 'Medicine',
  Other = 'Other',
}

enum Status {
  Active = 'Active',
  Resolved = 'Resolved',
  Archived = 'Archived',
}

enum Priority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

type User = {
  name: string;
  phone: string;
  avatarUrl?: string;
  orgnization?: string;
};

interface IEntry {
  id: string;
  type: Type.Medicine | Type.Other;
  summary: string;
  body: string;
  createdAt: string;
  lastUpdatedAt: string;
  postedBy: User;
  status: Status.Active | Status.Archived | Status.Resolved;
  priority: Priority.High | Priority.Medium | Priority.Low;
  isVerified?: boolean;
  externalSource?: string;
}

export const toReadableDate = (dateStr: string) => {
  return dayjs(dateStr).format('MMM DD, YYYY HH:mm');
};

export default function Requests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState<any>([]);
  const [type, setType] = useState('');
  const [priority, setPriority] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    setRequests(requestsData);
  }, []);

  useEffect(() => {
    if (!keyword) return;

    const _requests = requestsData.filter(({ summary, body }: any) => {
      let found = false;

      if (summary.toLowerCase().search(keyword.toLowerCase()) !== -1)
        found = true;
      if (body.toLowerCase().search(keyword.toLowerCase()) !== -1) found = true;

      return found;
    });
    setRequests(_requests);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  useEffect(() => {
    if (!priority) return;

    const _requests = requestsData.filter((request: any) => {
      return priority === request.priority;
    });
    setRequests(_requests);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priority]);

  useEffect(() => {
    if (!type) return;

    const _requests = requestsData.filter((request: any) => {
      return type === request.type;
    });
    setRequests(_requests);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleClick = (id: string) => navigate(`request/${id}`);

  return (
    <div>
      <div>
        <Filters>
          <Select
            options={[
              { value: 'Medicine', label: 'Medicine' },
              { value: 'Other', label: 'Other' },
            ]}
            defaultValue={type}
            onChange={({ value }: any) => setType(value)}
          />
          <Select
            options={[
              { value: 'High', label: 'High' },
              { value: 'Medium', label: 'Medium' },
              { value: 'Low', label: 'Low' },
            ]}
            defaultValue={priority}
            onChange={({ value }: any) => setPriority(value)}
          />
          <SearchInput
            type="text"
            placeholder="eg. Vitamin-C"
            value={keyword}
            onChange={(evt: any) => setKeyword(evt.target.value)}
          />
        </Filters>

        <List>
          {requests.map(
            ({
              id,
              type,
              summary,
              body,
              lastUpdatedAt,
              postedBy,
              priority,
              status,
            }: IEntry) => (
              <Row key={id} onClick={() => handleClick(id)}>
                <ColType type={type}>{type}</ColType>
                <ColId>{id}</ColId>
                <ColDesc>
                  <h4>{summary}</h4>
                  <Desc dangerouslySetInnerHTML={{ __html: body }} />
                  <Meta>
                    <DateTime>{`At ${toReadableDate(
                      lastUpdatedAt
                    )} `}</DateTime>
                    &bull;
                    <Author>{` by ${postedBy.name} ${
                      postedBy.orgnization ? (
                        <span>{` on behalf of ${postedBy.orgnization}`}</span>
                      ) : (
                        ''
                      )
                    }`}</Author>
                  </Meta>
                </ColDesc>
                <ColPriority>Priority:{priority}</ColPriority>
                <ColStatus>{status}</ColStatus>
              </Row>
            )
          )}
        </List>
      </div>
    </div>
  );
}
