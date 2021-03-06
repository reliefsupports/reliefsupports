import ReactSelect from 'react-select';
import styled from 'styled-components';

export const InputField = styled.div`
  margin: 5px 0;
`;

export const Label = styled.label`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
  line-height: 30px;
`;

export default function Select({
  name,
  label,
  options,
  value,
  onChange,
  onBlur,
  error,
  touched,
}: any) {
  const defaultValue = (ops: any, val: string) => {
    return ops ? ops.find((op: any) => op.value.toLowerCase() === val) : '';
  };
  return (
    <InputField>
      <div>
        <Label htmlFor={name}>{label}</Label>
      </div>
      <ReactSelect
        value={defaultValue(options, value)}
        options={options}
        onChange={(event: any) => onChange(event.value.toLowerCase())}
        onBlur={() => onBlur(name, true)}
      />
      {error && touched && <span>{error}</span>}
    </InputField>
  );
}
