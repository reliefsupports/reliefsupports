import styled from 'styled-components';

export const Textarea = styled.textarea`
  background: #ffffff;
  border: 1px solid #a3a3a3;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px 8px;
  color: #565555;
  width: 100%;
`;

export const Label = styled.label`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
`;

export default function TextArea({
  name,
  label,
  value,
  error,
  touched,
  placeholder,
  onChange,
}: any) {
  return (
    <div>
      <div>
        <Label htmlFor={name}>{label}</Label>
      </div>
      <Textarea
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error && touched && <span>{error}</span>}
    </div>
  );
}
