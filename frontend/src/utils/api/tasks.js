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
  const response = await authorizedClient.post("/tasks", {
    title,
    description,
  });
  return response.data;
}

export async function deleteTask(taskId) {
  const response = await authorizedClient.delete(`/tasks/${taskId}`);
  return response.data;
}
