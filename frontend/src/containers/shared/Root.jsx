import { Outlet, useLoaderData, useNavigate } from "react-router";
import UserProvider from "../../contexts/UserContext";
import { useEffect } from "react";

function Root() {
  const loaderData = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (loaderData?.user && window.location.pathname.includes("auth")) {
      navigate("/", { replace: true });
    }
  });

  return (
    <UserProvider initialUser={loaderData?.user}>
      <Outlet />
    </UserProvider>
  );
}

export default Root;
