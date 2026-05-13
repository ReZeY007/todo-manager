import { createContext, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { getUser } from "../utils/api/user";
import authorizedClient from "../utils/api/authorizedClient";
import { refresh } from "../utils/api/auth";

export const UserContext = createContext();

const UserProvider = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const updateUser = (user = null) => {
    if (user) {
      setUser(user);
    } else {
      getUser()
        .then((user) => setUser(user))
        .catch(() => setUser(null));
    }
  };

  useEffect(() => {
    updateUser();
  }, []);

  useEffect(() => {
    authorizedClient.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response.status === 401) {
          const originalResponse = error.config;

          try {
            await refresh();
            const repeatedResponseData = authorizedClient(originalResponse);
            return repeatedResponseData;
          } catch (error) {
            if (window.location.pathname !== "/auth/login") {
              updateUser();
              navigate("/auth/login");
              return Promise.reject(error);
            }
          }
        }
      },
    );
  }, [navigate]);

  return (
    <UserContext value={{ user, updateUser }}>
      <Outlet />
    </UserContext>
  );
};

export default UserProvider;
