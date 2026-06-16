import { useState } from "react";
import { Form, useActionData } from "react-router";
import "./Register.css";

function Register() {
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const actionData = useActionData();
  const [lastActionData, setLastActionData] = useState(actionData);
  let errorMsg = null;

  const handlePasswordChange = () => {
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector(
      'input[name="confirmPassword"]',
    ).value;
    setIsPasswordMatch(password === confirmPassword);
  };

  if (actionData) {
    switch (actionData?.status) {
      case 409:
        errorMsg = "User with this email is already registered";
        break;
      case 400:
        errorMsg = "Passwords don't match";
        break;
      default:
        errorMsg = "An unexpected error occured";
        break;
    }
  }

  if (actionData !== lastActionData) {
    switch (actionData?.status) {
      case 400:
        setIsPasswordMatch(false);
    }
    setLastActionData(actionData);
  }

  if (!isPasswordMatch) {
    errorMsg = "Passwords don't match";
  }

  return (
    <div className="register-panel block">
      <div className="register-head">
        <h1 className="register-title">Register</h1>
        {errorMsg && <p className="register-error-message">{errorMsg}</p>}
      </div>

      <Form action="/auth/register" method="post" className="register-form">
        <input type="text" name="username" placeholder="Username" />
        <input type="email" name="email" placeholder="Email" />
        <input
          type="password"
          className={!isPasswordMatch ? "danger" : ""}
          name="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          className={!isPasswordMatch ? "danger" : ""}
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handlePasswordChange}
        />
        <button
          type="submit"
          className="register-button"
          disabled={!isPasswordMatch}
        >
          Register
        </button>
      </Form>
    </div>
  );
}

export default Register;
