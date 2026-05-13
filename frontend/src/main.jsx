import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./pages/Home";
import Task from "./pages/Task";
import Default from "./layouts/Default";
import { auth } from "./routes/auth";
import homeLoader from "./loaders/homeLoader";
import taskLoader from "./loaders/taskLoader";
import UserProvider from "./contexts/UserContext.jsx";
import "./utils/api/global.js";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProvider />,
    children: [
      {
        element: <Default />,
        children: [
          {
            index: true,
            element: <Home />,
            loader: homeLoader,
          },
          {
            path: "tasks",
            element: <Task />,
          },
          {
            path: "tasks/:taskId",
            element: <Task />,
            loader: taskLoader,
          },
          auth,
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
