import Cookies from "js-cookie";
import axios from "axios";

export async function login({ email, password }) {
  const response = await axios.post(
    "/auth/login",
    {
      email,
      password,
    },
    { withCredentials: true },
  );

  return response.data;
}

export async function register({ username, email, password, confirmPassword }) {
  const response = await axios.post(
    "/auth/register",
    {
      username,
      email,
      password,
      confirmPassword,
    },
    { withCredentials: true },
  );

  return response.data;
}

export async function refresh() {
  const response = await axios.post(
    "/auth/refresh",
    {},
    {
      headers: {
        "X-CSRF-Token": Cookies.get("csrf_refresh_token"),
      },
      withCredentials: true,
    },
  );
  return response;
}

export async function logout() {
  const response = await axios.post(
    "/auth/logout",
    {},
    {
      headers: {
        "X-CSRF-Token": Cookies.get("csrf_access_token"),
      },
      withCredentials: true,
    },
  );
  return response.data;
}
