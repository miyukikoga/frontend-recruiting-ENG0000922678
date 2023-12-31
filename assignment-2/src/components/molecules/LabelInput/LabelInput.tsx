import { Label } from "../../atoms/Label";
import { Input } from "../../atoms/Input";
import "./labelInput.scss";

type InputProps = {
  label: string;
  placeholder: string;
  errorMessage: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export const LabelInput = (props: InputProps): JSX.Element => {
  return (
    <div className="LabelInput">
      <Label label={props.label} />
      <Input
        placeholder={props.placeholder}
        errorMessage={props.errorMessage}
        setValue={props.setValue}
      />
    </div>
  );
};
