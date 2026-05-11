import { useState, useContext, useEffect } from "react";
import { Form, useActionData, useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext.jsx";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const actionData = useActionData();
  const { setUser } = useContext(UserContext);

  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const handlePasswordChange = () => {
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector(
      'input[name="confirmPassword"]',
    ).value;
    setIsPasswordMatch(password === confirmPassword);
  };

  useEffect(() => {}, [actionData, navigate, setUser]);

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
