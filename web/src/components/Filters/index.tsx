/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { FormControl, InputLabel, Paper } from '@mui/material';
import { Dropdown } from 'components/Dropdown';
import { districts, priorities, categories } from '../../constants';

export default function Filters({
  district,
  setDistrict,
  priority,
  setPriority,
  category,
  setCategory,
}: {
  district: string;
  setDistrict: (event: any) => void;
  priority: string;
  setPriority: (event: any) => void;
  category: string;
  setCategory: (event: any) => void;
}) {
  return (
    <Paper style={{ margin: '10px 0 0' }}>
      <div>
        <FormControl style={{ width: 140, margin: 20 }}>
          <InputLabel id="district-select-label">District</InputLabel>
          <Dropdown
            label="district"
            value={district}
            onChange={setDistrict}
            optionsList={districts}
          />
        </FormControl>
        <FormControl style={{ width: 140, margin: 20 }}>
          <InputLabel id="priority-select-label">Priority</InputLabel>
          <Dropdown
            label="priority"
            value={priority}
            onChange={setPriority}
            optionsList={priorities}
          />
        </FormControl>
        <FormControl style={{ width: 140, margin: 20 }}>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Dropdown
            label="category"
            value={category}
            onChange={setCategory}
            optionsList={categories}
          />
        </FormControl>
      </div>
    </Paper>
  );
}
