import { login, getUser } from '../utils/api';


export default async function loginAction({ request }) {
  const formData = await request.formData();
  const userData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const response = await login(userData);

  if (!response.success) {
    return { error: response.msg };
  }

  const userResponse = await getUser()

  return { user: userResponse.data }
}
