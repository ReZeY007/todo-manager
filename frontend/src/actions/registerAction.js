import { redirect } from "react-router";
import { register } from "../utils/api/auth";

export default async function registerAction({ request }) {
  const formData = await request.formData();
  const userData = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  try {
    await register(userData);
    return redirect("/");
  } catch (error) {
    return { status: error.response.status };
  }
}
