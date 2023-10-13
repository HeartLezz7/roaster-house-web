import InputErrorMessage from "./InputErrorMessage";

export default function InputForm({
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  errorInput,
  errorMessage,
}) {
  return (
    <div className="flex flex-col gap-2">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="p-2 rounded-sm border border-gray-500"
      />
      {{ errorInput } && <InputErrorMessage message={errorMessage} />}
    </div>
  );
}
