import authorizedClient from "./authorizedClient";

export async function getTasks() {
  const response = await authorizedClient("/tasks");
  return response.data;
}

export async function getTask(taskId) {
  const response = await authorizedClient(`/tasks/${taskId}`);
  return response.data;
}

export async function updateTask({ id, title, description }) {
  const response = await authorizedClient.put(`/tasks/${id}`, {
    id,
    title,
    description,
  });
  return response.data;
}

export async function createTask({ title, description }) {
  try {
    const response = await authorizedClient.post("/tasks", {
      title,
      description,
    });

    return response.data;
  } catch (error) {
    console.error(error.message);
    return { error: error };
  }
}

export async function deleteTask(taskId) {
  const response = await authorizedClient.delete(`/tasks/${taskId}`);
  return response.data;
}
