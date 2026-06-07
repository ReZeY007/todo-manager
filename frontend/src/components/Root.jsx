import { Outlet, useLoaderData } from "react-router";
import UserProvider from "../contexts/UserContext";

function Root() {
  const loaderData = useLoaderData();
  return (
    <UserProvider initialUser={loaderData?.user}>
      <Outlet />
    </UserProvider>
  );
}

export default Root;
