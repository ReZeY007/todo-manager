import { useContext } from "react";
import { NavLink } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { logout } from "../../utils/api";
import "./Navbar.css";

function Navbar() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    const response = await logout();

    if (!response.ok) {
      window.location.reload();
    }

    setUser(null);
  };

  return (
    <nav className="navbar">
      <h1 className="navbar__header">TODO Manager</h1>
      <ul className="navbar__links">
        <li>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </li>
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
