import "./button.scss";

type ButtonProps = {
  label: string;
  disabled: boolean;
};

export const Button = (props: ButtonProps): JSX.Element => {
  if (props.disabled) {
    return (
      <button className="Button" type="submit" disabled>
        {props.label}
      </button>
    );
  }

  return (
    <button className="Button" type="submit">
      {props.label}
    </button>
  );
};
