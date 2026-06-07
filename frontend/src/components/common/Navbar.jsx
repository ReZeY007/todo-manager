import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { logout } from "../../utils/api/auth";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    const data = await logout();

    if (data?.error) {
      console.log(data.error);
      window.location.reload();
    }
    setUser(null);
    navigate("/auth/login", { replace: true });
  };

  return (
    <nav className="navbar">
      <h1 className="navbar__header">TODO Manager</h1>
      <ul className="navbar__links">
        {!user ? (
          <>
            <li>
              <NavLink to="/auth/login" className="nav-link">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/auth/register" className="nav-link">
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/tasks" className={"nav-link"}>
                New
              </NavLink>
            </li>
            <li>
              <a className="nav-link" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
