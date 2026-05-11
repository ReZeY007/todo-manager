import authorizedClient from "./authorizedClient";

export async function getUser() {
  const response = await authorizedClient("/user");
  return response.data;
}
