/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useGetDocuments } from '../../hooks/useGetDocuments';
import { isEmpty } from 'lodash';
import { Paper, Table, TableContainer } from '@mui/material';
import TableHead from 'components/TableHead';
import TableBody from 'components/TableBody';
import Filters from 'components/Filters';
import Loading from 'components/Loading';
import NoData from 'components/NoDate';
import { query } from 'utils';

export default function Requests() {
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
    const apiQuery = query({ district, priority, category, type: 'request' });
    getDocumentsAPI.getDocuments({ query: apiQuery });
  }, [district, priority, category]);

  const requests = getDocumentsAPI.data;
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
      {isEmpty(requests) && <NoData isNoData />}
      {!isEmpty(requests) && (
        <TableContainer style={{ margin: 20 }} component={Paper}>
          <Table
            sx={{ maxWidth: '100%' }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead type="Request" />
            <TableBody contentList={requests!} />
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
