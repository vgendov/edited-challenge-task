import { useState } from "react";
import useInput from "../hooks/use-input";
import { validateUsername, validatePassword } from "../utils/validations";
import WelcomeScreen from "./WelcomeScreen";
import InputComponent from "./InputComponent";

const AuthPage: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    value: email,
    isValid: isEmailValid,
    error: emailError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(validateUsername, "username");
  const {
    value: password,
    isValid: isPasswordValid,
    error: passwordError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(validatePassword, "password");

  const formIsValid = isEmailValid && isPasswordValid;

  const checkHandler = () => {
    setIsChecked((prevState) => !prevState);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const handleLogin = async () => {
      const response = await fetch("https://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const res = await response.json();
        alert(res.message);

        resetEmail();
        resetPassword();
      } else {
        if (isChecked) {
          localStorage.setItem("username", email);
        } else {
          localStorage.removeItem("username");
        }

        setIsLoggedIn(true);
      }
    };

    handleLogin();
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);

    resetPassword();
    !isChecked && resetEmail();
  };

  return (
    <>
      {!isLoggedIn && (
        <>
          <h1>Sign in to your account</h1>
          <div className="innerContainer">
            <form onSubmit={submitHandler}>
              <InputComponent
                value={email}
                placeHolder="Username"
                type="text"
                valueChangeHandler={emailChangeHandler}
                error={emailError}
                blurHandler={emailBlurHandler}
              />
              <InputComponent
                value={password}
                placeHolder="Password"
                type="password"
                valueChangeHandler={passwordChangeHandler}
                error={passwordError}
                blurHandler={passwordBlurHandler}
              />
              <div className="rememberMe">
                <input
                  type="checkbox"
                  placeholder="Remember Me"
                  checked={isChecked}
                  onChange={checkHandler}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <div className="buttonContainer">
                <button disabled={!formIsValid}>Login Now</button>
              </div>
            </form>
          </div>
        </>
      )}
      {isLoggedIn && (
        <WelcomeScreen onLogout={logoutHandler} username={email} />
      )}
    </>
  );
};

export default AuthPage;
