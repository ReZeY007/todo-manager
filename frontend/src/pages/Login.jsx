import { useContext, useEffect } from "react";
import { Form, useNavigate, useActionData } from "react-router";
import { UserContext } from "../contexts/UserContext.jsx";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const actionData = useActionData();
  const { setUser } = useContext(UserContext);

  useEffect(() => {}, [actionData, navigate, setUser]);

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
