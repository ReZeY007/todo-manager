import { register, login, getUser } from '../utils/api';


export default async function registerAction({request}) {
  const formData = await request.formData();
  const userData = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const registerResponse = await register(userData);

  if (!registerResponse.success) {
    return { error: registerResponse.msg };
  }

  const loginResponse = await login(userData);

  if (!loginResponse.success) {
    return { error: loginResponse.msg };
  }

  const userResponse = await getUser();

  if (userResponse.status == 200) {
    return {user: userResponse.data}
  }

  return { error: userResponse.error }
}
