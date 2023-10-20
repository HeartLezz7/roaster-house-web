export default function TextMessage({ text, grid = 1 }) {
  return (
    <div className={`col-span-${grid} border rounded-xl py-2 px-3`}>{text}</div>
  );
}
