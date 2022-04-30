import React from 'react';
import { TableBody as TBody, TableCell, TableRow } from '@mui/material';
import { DocumentResponse } from 'types/document';

export default function TableBody({
  contentList,
}: {
  contentList: DocumentResponse[];
}) {
  return (
    <TBody>
      {contentList.map((request: DocumentResponse) => {
        const {
          type,
          district,
          description,
          priority,
          category,
          status,
          createdAt,
        } = request.attributes;
        return (
          <TableRow
            key={request.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {request.id}
            </TableCell>
            <TableCell align="right">{district}</TableCell>
            <TableCell align="right">{description}</TableCell>
            <TableCell align="right">{priority}</TableCell>
            <TableCell align="right">{category}</TableCell>
            <TableCell align="right">{status}</TableCell>
            {/* <TableCell align="right">{createdAt?.toString()}</TableCell> */}
          </TableRow>
        );
      })}
    </TBody>
  );
}
