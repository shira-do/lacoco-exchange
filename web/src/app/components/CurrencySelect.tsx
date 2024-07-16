export default function CurrencySelect(props: {
  value: string;
  options: string[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <select
      className="select select-info w-full max-w-xs"
      onChange={props.onChange}
      value={props.value}
    >
      <option value={""} disabled selected>
        Select Token
      </option>
      {props.options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
