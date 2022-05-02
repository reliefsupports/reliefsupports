import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { fetchRequests as apiFetchRequests } from 'api/entries';

import Filters from 'modules/Filters';
import EntryList from 'components/Entry/List';
import Pagination from 'components/Pagination';

import { IEntry } from 'types';

export const toReadableDate = (dateStr: string) => {
  return dayjs(dateStr).format('MMM DD, YYYY HH:mm');
};

export default function Requests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState<any>([]);
  const [requestsFiltered, setRequestsFiltered] = useState<any>([]);

  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('Active');

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
    if (!category) return;

    const _requests = requests.filter((request: any) => {
      return category === request.category;
    });
    setRequestsFiltered(_requests);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleClick = (entry: IEntry) =>
    navigate(`entries/${entry.id}`, { state: entry });

  return (
    <div>
      <div>
        <Filters
          keyword={keyword}
          category={category}
          priority={priority}
          status={status}
          onChangeKeyword={setKeyword}
          onChangeCategory={setCategory}
          onChangePriority={setPriority}
          onChangeStatus={setStatus}
        />

        <EntryList entries={requestsFiltered} onClick={handleClick} />
        <Pagination />
      </div>
    </div>
  );
}
