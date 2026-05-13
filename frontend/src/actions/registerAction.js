import { register } from "../utils/api/auth";

export default async function registerAction({ request }) {
  const formData = await request.formData();
  const userData = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const response = await register(userData);

  if (response?.error) {
    return response.error;
  }

  return response;
}
