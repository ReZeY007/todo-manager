import axios from "axios";
import Cookies from "js-cookie";

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

// authorizedClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (error.response.status === 401) {
//       const originalResponse = error.config;

//       try {
//         const refreshResponse = await refresh();
//         const repeatedResponseData = authorizedClient(originalResponse);
//         return repeatedResponseData;
//       } catch (error) {
//         if (window.location.pathname !== "/auth/login") {
//           window.location.href = "/auth/login";
//           return Promise.reject(error);
//         }
//         // return Promise.reject(error);
//       }
//     }
//   },
// );

export default authorizedClient;
