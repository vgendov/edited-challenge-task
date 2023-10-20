import { useReducer } from "react";
import { StateType, ActionType } from "../utils/models";

const initialInputState = { value: "", isTouched: false };

let isInited = false;

const inputStateReducer = (state: StateType, action: ActionType) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  } else if (action.type === "BLUR") {
    return {
      value: state.value,
      isTouched: true,
    };
  } else if (action.type === "RESET") {
    return {
      value: "",
      isTouched: false,
    };
  }
  return initialInputState;
};

const useInput = (
  validateValue: (arg: string) => { isValid: boolean; error: string },
  type: string
) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  if (!isInited && type === "username") {
    isInited = true;

    dispatch({
      type: "INPUT",
      value: localStorage.getItem("username")
        ? localStorage.getItem("username")!.toString()
        : "",
    });
  }

  const result = validateValue(inputState.value);
  const valueIsValid = result.isValid;
  const error = {
    hasError: !result.isValid && inputState.isTouched,
    message: result.error,
  };

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "INPUT",
      value: event.target.value,
    });
  };

  const inputBlurHandler = () => {
    dispatch({ type: "BLUR", value: "" });
  };

  const reset = () => {
    dispatch({ type: "RESET", value: "" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    error,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
