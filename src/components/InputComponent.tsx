import { InputComponentType } from "../utils/models";

const InputComponent: React.FC<InputComponentType> = (props) => {
  return (
    <div>
      <input
        className="inputStyle"
        placeholder={props.placeHolder}
        type={props.type}
        value={props.value}
        onChange={props.valueChangeHandler}
        onBlur={props.blurHandler}
      />
      <div className="error-text">
        {props.error.hasError && <div>{props.error.message}</div>}
      </div>
    </div>
  );
};

export default InputComponent;
