import React from 'react';
import { TableCell, TableHead as THead, TableRow } from '@mui/material';

const TableHead = ({ type }: { type: string }) => (
  <THead>
    <TableRow>
      <TableCell>{type} ID</TableCell>
      <TableCell align="right">District</TableCell>
      <TableCell align="right">Description</TableCell>
      <TableCell align="right">Priority</TableCell>
      <TableCell align="right">Category</TableCell>
      <TableCell align="right">Status</TableCell>
      {/* <TableCell align="right">Posted Date</TableCell> */}
    </TableRow>
  </THead>
);

export default TableHead;
