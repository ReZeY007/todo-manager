import { createContext, useState, useEffect } from 'react';
import { useLoaderData, Outlet } from 'react-router';


export const UserContext = createContext();

export const UserProvider = () => {
  const loaderData = useLoaderData();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    if (loaderData?.user) {
      setUser(loaderData.user);
    }
  }, [])

  return (
    <UserContext value = {{ user, setUser }}>
      <Outlet />
    </UserContext>
  );
}