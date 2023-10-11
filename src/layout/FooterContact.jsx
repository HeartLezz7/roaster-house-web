export default function FooterContact({ title, src }) {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex justify-center items-center bg-neutral-400 rounded-full p-1.5">
        <img src={src} alt="icon" className="w-6" />
      </div>
      <span>{title}</span>
    </div>
  );
}
