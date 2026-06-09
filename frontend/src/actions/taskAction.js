import { redirect } from "react-router";
import { updateTask, deleteTask } from "../utils/api/tasks";

export default async function taskAction({ request, params }) {
  const { taskId } = params;

  switch (request.method.toUpperCase()) {
    case "PUT": {
      const formData = await request.formData();
      const taskData = {
        id: taskId,
        title: formData.get("title"),
        description: formData.get("description"),
      };

      try {
        const response = await updateTask(taskData);
        return response;
      } catch (error) {
        console.error(error);
        break;
      }
    }

    case "DELETE": {
      try {
        await deleteTask(taskId);
        return redirect("/");
      } catch (error) {
        console.error(error);
        break;
      }
    }
  }
}
