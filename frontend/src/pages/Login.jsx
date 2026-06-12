import { useContext } from "react";
import { Form } from "react-router";
import { UserContext } from "../contexts/UserContext";
import "./Login.css";
import { useEffect } from "react";

function Login() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setUser(null);
    }
  });

  return (
    <div className="login-panel block">
      <h1 className="login-title">Login</h1>

      <Form action="/auth/login" method="post" className="login-form">
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit" className="login-button">
          Login
        </button>
      </Form>
    </div>
  );
}

export default Login;
