import { getTask } from "../utils/api/tasks";

export default async function taskLoader({ params }) {
  const taskId = params.taskId;
  const data = await getTask(taskId);

  return { taskData: data.task };
}
