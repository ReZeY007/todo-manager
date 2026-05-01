import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./pages/Home.jsx";
import Task from "./pages/Task.jsx";
import Default from "./layouts/Default.jsx";
import { auth } from "./routes/auth.jsx";
import { getUser } from "./utils/api.js";
import { UserProvider } from "./contexts/UserContext.jsx";
import homeLoader from "./loaders/homeLoader";
import taskLoader from "./loaders/taskLoader";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProvider />,
    loader: async () => {
      const response = await getUser();

      if (response.status === 200) {
        const data = response.data;
        return { user: data };
      }

      return null;
    },
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
            element: <Task isNew />,
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
