import { redirect } from "react-router";
import { logout } from "../utils/api/auth";

export default async function logoutAction() {
  try {
    await logout();
    return redirect("/auth/login");
  } catch (error) {
    console.error(error);
  }
}
