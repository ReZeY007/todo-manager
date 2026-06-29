import { useContext } from "react";
import { Outlet, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

function ProtectedRoute() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/auth/login");
    return null;
  }

  return <Outlet />;
}

export default ProtectedRoute;
