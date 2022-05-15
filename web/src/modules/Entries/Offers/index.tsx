import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { fetch as apiFetchRequests } from 'api/entries';

import Filters from 'modules/Filters';
import EntryList from 'components/Entry/List';

import { IEntry } from 'types';

export const toReadableDate = (dateStr: string) => {
  return dayjs(dateStr).format('MMM DD, YYYY HH:mm');
};

export default function Requests() {
  const navigate = useNavigate();

  const [requestsFiltered, setRequestsFiltered] = useState<any>([]);

  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('Published');
  const [page, setPage] = useState(1);

  const fetchRequests = async (onPaginate = false) => {
    let pageNumber = 1;
    if (onPaginate) {
      pageNumber = page + 1;
      setPage(pageNumber);
    }
    const requestFilter = {
      type: 'offer',
      ...(category && { category: category.toLowerCase() }),
      ...(priority && { priority: priority.toLowerCase() }),
      ...(status && { status: status.toLowerCase() }),
      ...(keyword && { search: keyword }),
      ...(page && { page: pageNumber }),
    };
    const _requests = await apiFetchRequests(requestFilter);
    setRequestsFiltered((data: any) => {
      const response: any = _requests;
      if (pageNumber === 1) return response;
      return [...data, ...response];
    });
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, priority, category, status]);

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

        <EntryList
          entries={requestsFiltered}
          onClick={handleClick}
          onNext={() => fetchRequests(true)}
        />
        {/* <Pagination page={page} handleChange={({ value }: any)=>{setPage(value)}}/> */}
      </div>
    </div>
  );
}
