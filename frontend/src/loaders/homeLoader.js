import { getTasks } from "../utils/api/tasks";

export default function homeLoader() {
  const tasks = getTasks()
    .then((data) => {
      return data.tasks;
    })
    .catch((error) => {
      console.error(error);
    });

  return { tasks };
}
