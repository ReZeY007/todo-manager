import { getTasks } from "../utils/api";

export default function homeLoader() {
  const tasks = getTasks()
    .then((response) => {
      const data = response.json();
      return data;
    })
    .then((data) => {
      return data.tasks;
    });

  return { tasks: tasks };
}
