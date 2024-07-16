export default function NumberInput(props: {
  value: string | null;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="text"
      placeholder="Type here"
      className="input input-bordered input-primary w-full max-w-xs"
      value={props.value ?? ""}
      onChange={props.onChange}
    />
  );
}
