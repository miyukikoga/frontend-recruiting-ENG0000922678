import { Label } from "../parts/label";
import { Select } from "../parts/select";

type SelectProps = {
  label: string;
  placeholder: string;
  items: string[];
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export const LabelSelect = (props: SelectProps): JSX.Element => {
  return (
    <div className="LabelSelect">
      <Label label={props.label} />
      <Select
        placeholder={props.placeholder}
        items={props.items}
        setValue={props.setValue}
      />
    </div>
  );
};
