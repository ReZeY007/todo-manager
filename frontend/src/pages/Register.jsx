import { useState } from "react";
import { Form } from "react-router";
import "./Register.css";

function Register() {
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const handlePasswordChange = () => {
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector(
      'input[name="confirmPassword"]',
    ).value;
    setIsPasswordMatch(password === confirmPassword);
  };

  return (
    <div className="register-panel block">
      <h1 className="register-title">Register</h1>

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
