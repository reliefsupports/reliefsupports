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
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

  const districts = ['Colombo', 'Gampaha', "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Matara", "Hambanthota", "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullativ", "Batticaloa", "Ampara", "Trincomalee", "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Moneragala", "Ratnapura", "Kegalle"];
  const priorities = ['High', 'Medium', "Low"];
  const categories = ['Medicine', 'Food', "Transport"];


  useEffect(() => {
    const query = qs.stringify(
      {
        filters: {
          type: {
            $eq: 'offer',
          },
          destrict: district ? {
            $eq: district,
          } : undefined,
          priority: priority ? {
            $eq: priority,
          } : undefined,
          category: category ? {
            $eq: category,
          } : undefined,
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    getDocumentsAPI.getDocuments({ query: query });

  }, [district, priority, category]);

  if (getDocumentsAPI.error) return <div>Error!</div>;
  // if (getDocumentsAPI.loading) return <div>Loading!</div>;
  // if (isEmpty(getDocumentsAPI.data)) return <div>no donations!</div>;

  const offers = getDocumentsAPI.data;

  return (
    <Container maxWidth="lg">
      <Paper  style={{margin:20}}>
        <div>
          <FormControl style={{width:140, margin:20}}>
            <InputLabel id="district-select-label">District</InputLabel>
            <Select
              labelId="district-select-label"
              id="district-select"
              value={district}
              label="District"
              onChange={handleChangeDistrict}
            >
              {districts.map(el => {
                return <MenuItem key={el} value={el}>{el}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl style={{width:130, margin:20}}>
            <InputLabel id="priotity-select-label">Priority</InputLabel>
            <Select
              labelId="priotity-select-label"
              id="priority-select"
              value={priority}
              label="Priority"
              onChange={handleChangePriority}
            >
              {priorities.map(el => {
                return <MenuItem key={el} value={el}>{el}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl style={{width:140, margin:20}}>
            <InputLabel id="category-select-label">Categoty</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category}
              label="Categoty"
              onChange={handleChangeCategory}
            >
              {categories.map(el => {
                return <MenuItem key={el} value={el}>{el}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
      </Paper>
      {getDocumentsAPI.loading ? <div>Loading!</div> : isEmpty(getDocumentsAPI.data) ?  <div>no donations!</div> : 
      <TableContainer style={{margin:20}} component={Paper}>
        <Table sx={{ maxWidth: '100%' }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Offer ID</TableCell>
              <TableCell align="right">District</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Priority</TableCell>
              <TableCell align="right">Category</TableCell>
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
    }
    </Container>
  );
}
