import { redirect } from "react-router";
import { updateTask, deleteTask, patchTask } from "../utils/api/tasks";

export default async function taskAction({ request, params }) {
  const { taskId } = params;
  console.log(request.url);

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

    case "PATCH": {
      const formData = await request.formData();
      let taskData = {
        title: formData.get("title"),
        description: formData.get("description"),
        isCompleted: formData.get("isCompleted") === "true",
      };

      taskData = Object.fromEntries(
        Object.entries(taskData).filter(([_, v]) => v !== null),
      );

      try {
        const data = await patchTask(taskId, taskData);
        return data;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
