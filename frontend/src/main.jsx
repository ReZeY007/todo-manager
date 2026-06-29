import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./pages/Home";
import Default from "./layouts/Default";
import authRoutes from "./routes/auth";
import tasksRoutes from "./routes/tasks";
import { Root } from "./containers/shared";
import homeLoader from "./loaders/homeLoader";
import userLoader from "./loaders/userLoader";
import NewList from "./pages/NewList.jsx";
import newListLoader from "./loaders/newListLoader.js";
import "./api/global.js";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
            path: "lists",
            element: <NewList />,
            loader: newListLoader,
          },
          tasksRoutes,
          authRoutes,
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
