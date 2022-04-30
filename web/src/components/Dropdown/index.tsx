import React from 'react';
import { MenuItem, Select } from '@mui/material';
import { districts } from 'constants/district';
import { priorities } from 'constants/priorities';
import { categories } from 'constants/categories';
import { capitalize } from 'lodash';

const Dropdown = ({
  label,
  value,
  onChange,
  optionsList,
}: {
  label: string;
  value: string;
  onChange: (event: any) => void;
  optionsList: typeof districts | typeof priorities | typeof categories;
}) => (
  <Select
    labelId={`${label}-select-label`}
    id={`${label}-select`}
    value={value}
    label={capitalize(label)}
    onChange={onChange}
  >
    <MenuItem value="">None</MenuItem>
    {optionsList.map((option) => {
      return (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      );
    })}
  </Select>
);

export { Dropdown };
