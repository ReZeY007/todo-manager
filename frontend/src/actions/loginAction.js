import { login } from "../utils/api/auth";

export default async function loginAction({ request }) {
  const formData = await request.formData();
  const userData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const response = await login(userData);

  if (response?.error) {
    return response.error;
  }

  return response;
}
