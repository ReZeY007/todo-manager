import { useContext, useState, useEffect } from "react";
import { Form, useActionData } from "react-router";
import { UserContext } from "../contexts/UserContext";
import "./Login.css";

function Login() {
  const { user, setUser } = useContext(UserContext);
  const [password, setPassword] = useState({
    value: "",
    lastActionData: null,
  });
  const actionData = useActionData();
  let errorMsg = "";

  if (actionData?.status === 401 && password.lastActionData !== actionData) {
    setPassword({
      value: "",
      lastActionData: actionData,
    });
  }

  const handlePasswordChange = (e) => {
    setPassword({
      value: e.target.value,
      lastActionData: actionData,
    });
  };

  if (actionData) {
    switch (actionData?.status) {
      case 401:
        errorMsg = "Invalid email or password";
        break;
      default:
        errorMsg = "An unexpected error occured";
        break;
    }
  }

  useEffect(() => {
    if (user) {
      setUser(null);
    }
  });

  return (
    <div className="login-panel block">
      <div className="login-head">
        <h1 className="login-title">Login</h1>
        {errorMsg && <p className="login-error-message">{errorMsg}</p>}
      </div>

      <Form action="/auth/login" method="post" className="login-form">
        <input type="email" name="email" placeholder="Email" />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password.value}
          onChange={handlePasswordChange}
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </Form>
    </div>
  );
}

export default Login;
