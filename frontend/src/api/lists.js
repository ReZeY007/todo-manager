import authorizedClient from "./authorizedClient";

export async function getLists() {
  const response = await authorizedClient("/lists");
  return response.data;
}

export async function getList(listId) {
  const response = await authorizedClient(`/lists/${listId}`);
  return response.data;
}
