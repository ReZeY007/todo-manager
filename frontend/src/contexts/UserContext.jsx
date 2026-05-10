import { createContext, useState } from "react";
import { useLoaderData, Outlet } from "react-router";

export const UserContext = createContext();

export const UserProvider = () => {
  const loaderData = useLoaderData();
  console.log(loaderData);
  const [user, setUser] = useState(loaderData?.user);
  console.log(user);
  return (
    <UserContext value={{ user, setUser }}>
      <Outlet />
    </UserContext>
  );
};
