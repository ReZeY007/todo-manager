import { Outlet } from "react-router";
import { Navbar } from "../containers/shared/";
import "./Default.css";

function Default() {
  return (
    <div className="default-layout">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Default;
