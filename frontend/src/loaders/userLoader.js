import { getUser } from "../api/user";

export default async function userLoader() {
  try {
    const user = await getUser();
    return { user: user };
  } catch {
    return null;
  }
}
