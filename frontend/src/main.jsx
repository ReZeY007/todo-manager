import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./pages/Home.jsx";
import Task from "./pages/Task.jsx";
import Default from "./layouts/Default.jsx";
import { auth } from "./routes/auth.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import homeLoader from "./loaders/homeLoader";
import taskLoader from "./loaders/taskLoader";
import userLoader from "./loaders/userLoader";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProvider />,
    loader: userLoader,
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
        ],
      },
      auth,
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
