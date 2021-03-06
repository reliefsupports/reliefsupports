import styled from 'styled-components';

export const InputField = styled.div`
  margin: 5px 0;
`;

export const Input = styled.input`
  background: #ffffff;
  border: 1px solid #a3a3a3;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px 8px;
  color: #565555;
  width: 100%;
  height: 40px;
`;

export const Label = styled.label`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
  line-height: 30px;
`;

export default function TextInput({
  type = 'text',
  label,
  name,
  onChange,
  onBlur,
  value,
  touched,
  error,
  placeholder,
}: any) {
  return (
    <InputField>
      <div>
        <Label htmlFor={name}>{label}</Label>
      </div>
      <Input
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
      />
      {error && touched && <span>{error}</span>}
    </InputField>
  );
}
