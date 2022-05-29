import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import styled from 'styled-components';

import { fetch as apiFetchRequests } from 'api/entries';

import Filters from 'modules/Filters';
import EntryList from 'components/Entry/List';

import { IEntry } from 'types';

import MobileList from 'components/Entry/MobileList';

export const toReadableDate = (dateStr: string) => {
  return dayjs(dateStr).format('MMM DD, YYYY HH:mm');
};

export const DesktopView = styled.div`
  display: flex;
  @media screen and (max-width: 425px) {
    display: none;
  }
`;

export const MobileView = styled.div`
  display: none;
  @media screen and (max-width: 425px) {
    display: flex;
  }
`;

export default function Requests() {
  const navigate = useNavigate();

  const [requestsFiltered, setRequestsFiltered] = useState<any>([]);

  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const fetchRequests = async (onPaginate = false) => {
    let pageNumber = 1;
    if (onPaginate) {
      pageNumber = page + 1;
      setPage(pageNumber);
    }
    const requestFilter = {
      type: 'request',
      ...(category && { category: category.toLowerCase() }),
      ...(priority && { priority: priority.toLowerCase() }),
      ...(status && { status: status.toLowerCase() }),
      ...(keyword && { search: keyword }),
      ...(page && { page: pageNumber }),
    };
    const _requests = await apiFetchRequests(requestFilter);
    setRequestsFiltered((data: any) => {
      const response: any = _requests;
      if (pageNumber === 1) {
        window.scrollTo(0, 0);
        return response;
      }
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

      <DesktopView>
        <EntryList
          entries={requestsFiltered}
          onClick={handleClick}
          onNext={() => fetchRequests(true)}
        />
      </DesktopView>

      <MobileView>
        <MobileList
          entries={requestsFiltered}
          onClick={handleClick}
          onNext={() => fetchRequests(true)}
        />
      </MobileView>
      {/* <Pagination page={page} handleChange={({ value }: any)=>{setPage(value)}}/> */}
    </div>
  );
}
