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
        <label htmlFor={name}>{label}</label>
      </div>
      <textarea
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error && touched && <span>{error}</span>}
    </div>
  );
}
