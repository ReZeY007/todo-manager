import createTaskAction from "../actions/createTaskAction";
import taskLoader from "../loaders/taskLoader";
import taskAction from "../actions/taskAction";
import Task from "../pages/Task";
import NewTask from "../pages/NewTask";

const tasks = {
  path: "tasks",
  action: createTaskAction,
  children: [
    {
      index: true,
      element: <NewTask />,
    },
    {
      path: ":taskId",
      element: <Task />,
      loader: taskLoader,
      action: taskAction,
    },
  ],
};

export default tasks;
