/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { useGetDocuments } from '../../hooks/useGetDocuments';
import qs from 'qs';
import { isEmpty } from 'lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const query = qs.stringify(
  {
    filters: {
      type: {
        $eq: 'offer',
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

export default function Offers() {
  const getDocumentsAPI = useGetDocuments();

  useEffect(() => {
    getDocumentsAPI.getDocuments({ query: query });
  }, []);
  if (getDocumentsAPI.error) return <div>Error!</div>;
  if (getDocumentsAPI.loading) return <div>Loading!</div>;
  if (isEmpty(getDocumentsAPI.data)) return <div>no donations!</div>;

  const offers = getDocumentsAPI.data;

  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Offer ID</TableCell>
          <TableCell align="right">District</TableCell>
          <TableCell align="right">Description</TableCell>
          <TableCell align="right">Priority</TableCell>
          <TableCell align="right">Categoty</TableCell>
          <TableCell align="right">Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {offers!.map((offer) => {
          const { type, district, description, priority, category, status } = offer.attributes;
          return (
          <TableRow
            key={offer.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {offer.id}
            </TableCell>
            <TableCell align="right">{district}</TableCell>
            <TableCell align="right">{description}</TableCell>
            <TableCell align="right">{priority}</TableCell>
            <TableCell align="right">{category}</TableCell>
            <TableCell align="right">{status}</TableCell>
          </TableRow>
        )})}
      </TableBody>
    </Table>
    </TableContainer>
  );
}
