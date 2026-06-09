import axios from "axios";
import Cookies from "js-cookie";
import { refresh } from "./auth";
import { redirect } from "react-router";

const authorizedClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

authorizedClient.interceptors.request.use(
  (request) => {
    request.headers["X-CSRF-Token"] = Cookies.get("csrf_access_token");
    return request;
  },
  (error) => {
    console.log(error.message);
    Promise.reject(error);
  },
);

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
      } catch {
        throw redirect("/auth/login");
      }
    }
  },
);

export default authorizedClient;
