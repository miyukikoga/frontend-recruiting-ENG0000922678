import "./input.scss";

type InputProps = {
  placeholder: string;
  errorMessage: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export const Input = (props: InputProps): JSX.Element => {
  if (props.errorMessage) {
    return (
      <>
        <input
          className="InputError"
          placeholder={props.placeholder}
          onChange={(e) => props.setValue(e.target.value)}
        />
        <div />
        <div className="ErrorMessage">{props.errorMessage}</div>
      </>
    );
  }

  return (
    <input
      className="Input"
      placeholder={props.placeholder}
      onChange={(e) => props.setValue(e.target.value)}
    />
  );
};
