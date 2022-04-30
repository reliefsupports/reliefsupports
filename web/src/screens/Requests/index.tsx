/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { useGetDocuments } from '../../hooks/useGetDocuments';
import qs from 'qs';
import { isEmpty } from 'lodash';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const query = qs.stringify(
  {
    filters: {
      type: {
        $eq: 'request',
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

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

  const districts = [
    'Colombo',
    'Gampaha',
    'Kalutara',
    'Kandy',
    'Matale',
    'Nuwara Eliya',
    'Galle',
    'Matara',
    'Hambanthota',
    'Jaffna',
    'Kilinochchi',
    'Mannar',
    'Vavuniya',
    'Mullativ',
    'Batticaloa',
    'Ampara',
    'Trincomalee',
    'Kurunegala',
    'Puttalam',
    'Anuradhapura',
    'Polonnaruwa',
    'Badulla',
    'Moneragala',
    'Ratnapura',
    'Kegalle',
  ];
  const priorities = ['High', 'Medium', 'Low'];
  const categories = ['Medicine', 'Food', 'Transport'];

  useEffect(() => {
    const query = qs.stringify(
      {
        filters: {
          type: {
            $eq: 'offer',
          },
          district: {
            type: {
              $eq: district || undefined,
            },
          },
          priority: {
            type: {
              $eq: priority || undefined,
            },
          },
          category: {
            type: {
              $eq: category || undefined,
            },
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    getDocumentsAPI.getDocuments({ query: query });
  }, [district, priority, category]);

  const requests = getDocumentsAPI.data;

  return (
    <div>
      <Paper style={{ margin: 20 }}>
        <div>
          <FormControl style={{ width: 140, margin: 20 }}>
            <InputLabel id="district-select-label">District</InputLabel>
            <Select
              labelId="district-select-label"
              id="district-select"
              value={district}
              label="District"
              onChange={handleChangeDistrict}
            >
              {districts.map((el) => {
                return (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl style={{ width: 130, margin: 20 }}>
            <InputLabel id="priotity-select-label">Priority</InputLabel>
            <Select
              labelId="priotity-select-label"
              id="priority-select"
              value={priority}
              label="Priority"
              onChange={handleChangePriority}
            >
              {priorities.map((el) => {
                return (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl style={{ width: 140, margin: 20 }}>
            <InputLabel id="category-select-label">Categoty</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category}
              label="Categoty"
              onChange={handleChangeCategory}
            >
              {categories.map((el) => {
                return (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </Paper>
      {getDocumentsAPI.loading ? (
        <div>Loading!</div>
      ) : isEmpty(getDocumentsAPI.data) ? (
        <div>no Requests!</div>
      ) : (
        <TableContainer style={{ margin: 20 }} component={Paper}>
          <Table
            sx={{ maxWidth: '100%' }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Offer ID</TableCell>
                <TableCell align="right">District</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Priority</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Status</TableCell>
                {/* <TableCell align="right">Posted Date</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {requests!.map((request) => {
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
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
