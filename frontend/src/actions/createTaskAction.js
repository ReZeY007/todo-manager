import { redirect } from "react-router";
import { createTask } from "../api/tasks";

export default async function createTaskAction({ request }) {
  const formData = await request.formData();
  const taskData = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  try {
    const data = await createTask(taskData);
    return redirect(`/tasks/${data.id}`);
  } catch (error) {
    return error;
  }
}
