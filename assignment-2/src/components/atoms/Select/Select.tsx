import "./select.scss";

type SelectProps = {
  placeholder: string;
  items: string[];
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export const Select = (props: SelectProps): JSX.Element => {
  const onChangeHandler: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    props.setValue(e.target.value);
    e.target.style.color = "black";
  };

  return (
    <select className="Select" onChange={onChangeHandler}>
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
