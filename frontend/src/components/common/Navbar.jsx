import { useContext } from "react";
import { NavLink, useSubmit } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import "./Navbar.css";

function Navbar() {
  const submit = useSubmit();
  const { user } = useContext(UserContext);

  const handleLogout = async () => {
    submit(
      {},
      {
        action: "/auth/logout",
        method: "POST",
      },
    );
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
