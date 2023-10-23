type SelectProps = {
  placeholder: string;
  items: string[];
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export const Select = (props: SelectProps): JSX.Element => {
  return (
    <select className="Input" onChange={(e) => props.setValue(e.target.value)}>
      <option hidden value="">
        {props.placeholder}
      </option>
      {props.items.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};
