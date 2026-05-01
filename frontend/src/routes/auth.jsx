import Auth from "../layouts/Auth";
import Login from "../pages/Login";
import Register from "../pages/Register"
import loginAction from "../actions/loginAction";
import registerAction from "../actions/registerAction";

export const auth = {
  element: <Auth />,
  children: [
    {
      path: "auth/login",
      element: <Login />,
      action: loginAction,
    },
    {
      path: "auth/register",
      element: <Register />,
      action: registerAction,
    },
  ],
};