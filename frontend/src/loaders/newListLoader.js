import { getTasks } from "../utils/api/tasks";

export default async function newListLoader() {
  try {
    const data = await getTasks();
    const uncategorizedTasks = data.tasks.filter((list) => {
      if (list.id === null) {
        return true;
      }
      return false;
    });

    return { availableTasks: uncategorizedTasks[0].tasks };
  } catch {
    return null;
  }
}
