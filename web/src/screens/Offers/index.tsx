/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { useGetDocuments } from '../../hooks/useGetDocuments';
import { isEmpty } from 'lodash';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { query } from 'utils';
import Filters from 'components/Filters';
import Loading from 'components/Loading';
import NoData from 'components/NoDate';
import TableHead from 'components/TableHead';
import TableBody from 'components/TableBody';

export default function Offers() {
  const getDocumentsAPI = useGetDocuments();

  const [district, setDistrict] = React.useState('');
  const [priority, setPriority] = React.useState('');
  const [category, setCategory] = React.useState('');

  const handleChangeDistrict = (event: any) => {
    setDistrict(event.target.value);
  };

  const handleChangePriority = (event: any) => {
    setPriority(event.target.value);
  };

  const handleChangeCategory = (event: any) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    const apiQuery = query({ district, priority, category, type: 'offer' });
    getDocumentsAPI.getDocuments({ query: apiQuery });
  }, [district, priority, category]);

  if (getDocumentsAPI.error) return <div>Error!</div>;

  const offers = getDocumentsAPI.data;

  return (
    <div>
      <Filters
        district={district}
        setDistrict={handleChangeDistrict}
        priority={priority}
        setPriority={handleChangePriority}
        category={category}
        setCategory={handleChangeCategory}
      />
      {getDocumentsAPI.loading && <Loading loading />}
      {isEmpty(offers) && <NoData isNoData />}
      {!isEmpty(offers) && (
        <TableContainer style={{ margin: 20 }} component={Paper}>
          <Table
            sx={{ maxWidth: '100%' }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead type="Offer" />
            <TableBody contentList={offers!} />
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
