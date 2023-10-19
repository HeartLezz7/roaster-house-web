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
    <div className="flex flex-col gap-2 w-full ">
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
