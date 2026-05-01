import { Outlet } from "react-router";
import './Auth.css';

function Auth() {
  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  )
}

export default Auth