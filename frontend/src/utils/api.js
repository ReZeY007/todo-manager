import Cookies from "js-cookie";

const BASE_URL = "http://localhost:5000/api";
const AUTHORIZED_HEADERS = () => {
  return {
    "Content-Type": "application/json",
    "X-CSRF-Token": Cookies.get("csrf_access_token"),
  };
};

export async function register(userData) {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, msg: data.msg };
    }

    return { success: false, msg: data.msg };
  } catch (e) {
    return { success: false, msg: "Network error" };
  }
}

export async function login(userData) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true };
    }

    return { success: false, msg: data.msg };
  } catch (e) {
    return { success: false, msg: "Network error" };
  }
}

export async function getUser() {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      method: "GET",
      headers: AUTHORIZED_HEADERS(),
      credentials: "include",
    });

    if (response.ok) {
      const userData = await response.json();
      return { status: response.status, data: userData };
    } else if (response.status == "401") {
      return { status: response.status, error: "Unauthorized" };
    }

    return { status: response.status, error: "Unexpected error" };
  } catch (e) {
    return { error: "No network" };
  }
}

export async function logout() {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    headers: AUTHORIZED_HEADERS(),
    credentials: "include",
  });

  return response;
}

export async function getTasks() {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "GET",
    headers: AUTHORIZED_HEADERS(),
    credentials: "include",
  });

  return response;
}

export async function getTask(taskId) {
  const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: "GET",
    headers: AUTHORIZED_HEADERS(),
    credentials: "include",
  });

  return response;
}

export async function updateTask(taskData) {
  const taskId = taskData.id;

  const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: AUTHORIZED_HEADERS(),
    credentials: "include",
    body: JSON.stringify(taskData),
  });

  return response;
}

export async function createTask(taskData) {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: AUTHORIZED_HEADERS(),
    credentials: "include",
    body: JSON.stringify(taskData),
  });

  return response;
}

export async function deleteTask(taskId) {
  const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: AUTHORIZED_HEADERS(),
    credentials: "include",
  });

  return response;
}
