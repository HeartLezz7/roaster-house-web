import InputErrorMessage from "./InputErrorMessage";

export default function InputForm({
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  errorInput,
  errorMessage,
  gap = "2",
}) {
  return (
    <div className={`flex flex-col gap-${gap} w-full `}>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className=" rounded-xl py-2 px-3 border"
      />
      {{ errorInput } && <InputErrorMessage message={errorMessage} />}
    </div>
  );
}
