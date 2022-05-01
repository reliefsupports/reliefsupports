import ReactSelect from 'react-select';
import styled from 'styled-components';

export const Label = styled.label`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
`;

export default function Select({ name, label, options }: any) {
  return (
    <div>
      <div>
        <Label htmlFor={name}>{label}</Label>
      </div>
      <ReactSelect options={options} />
    </div>
  );
}
