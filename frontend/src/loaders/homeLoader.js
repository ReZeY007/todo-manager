import { getTasks } from "../utils/api/tasks";

export default function homeLoader() {
  const lists = getTasks().then((data) => {
    return data.tasks;
  });
  // .catch((error) => {
  //   console.error(error);
  // });

  return { lists };
}
