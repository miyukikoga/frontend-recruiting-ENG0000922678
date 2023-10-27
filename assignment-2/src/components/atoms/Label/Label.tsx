import "./label.scss";

type InputProps = {
  label: string;
};

export const Label = (props: InputProps): JSX.Element => {
  return <label className="Label">{props.label}</label>;
};
