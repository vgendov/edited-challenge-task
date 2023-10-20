export type StateType = { value: string; isTouched: boolean };

export type ActionType = { type: string; value: string };

export type InputComponentType = {
  value: string;
  placeHolder: string;
  type: string;
  error: { hasError: boolean; message: string };
  valueChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  blurHandler: () => void;
};
