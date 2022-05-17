import styled from 'styled-components';

export const InputField = styled.div`
  margin: 5px 0;
`;

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
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
  line-height: 30px;
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
    <InputField>
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
    </InputField>
  );
}
