import { getTasks } from "../utils/api/tasks";

export default function homeLoader() {
  const tasks = getTasks().then((data) => {
    return data.tasks;
  });

  return { tasks };
}
