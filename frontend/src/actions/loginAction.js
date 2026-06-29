import { redirect } from "react-router";
import { login } from "../api/auth";

export default async function loginAction({ request }) {
  const formData = await request.formData();
  const userData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    await login(userData);
    return redirect("/");
  } catch (error) {
    return { status: error.response.status };
  }
}
