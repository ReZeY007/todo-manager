import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children, initialUser }) => {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  return <UserContext value={{ user, setUser }}>{children}</UserContext>;
};

export default UserProvider;
