export default function InputForm({
  type = "text",
  placeholder,
  name,
  value,
  onChange,
}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="p-2 rounded-sm border border-gray-500"
      />
    </>
  );
}
