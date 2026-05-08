import { getUser, refresh } from "../utils/api";

export default async function userLoader() {
  const response = await getUser();

  if (response.ok) {
    const data = await response.json();
    return { user: data };
  } else if (response.status === 401) {
    const refreshResponse = await refresh();

    if (refreshResponse.ok) {
      const repeatResponse = await getUser();

      if (repeatResponse.ok) {
        window.location.reload();
        return null;
        // const data = await repeatResponse.json();
        // return { user: data };
      }
    }
  }

  return null;
}
