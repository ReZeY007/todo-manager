import { getTask } from "../utils/api";

export default async function taskLoader({ params }) {
  const taskId = params.taskId;
  const response = await getTask(taskId);
  const responseData = await response.json();

  if (response.ok) {
    return { taskData: await responseData.task };
  }
}
