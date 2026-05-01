import axios from "axios";

// 🔥 AXIOS INSTANCE
const api = axios.create({
  baseURL: "https://localhost:7060/api", 
  timeout: 10000,
});

// 🔐 TOKEN INTERCEPTOR
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// =======================
// 📁 PROJECT APIs
// =======================
export const getProjects = () => api.get("/project");

export const createProject = (data) =>
  api.post("/project", data);

// =======================
// 📁 TASK APIs
// =======================
export const getTasks = () => api.get("/task");

export const createTask = (data) =>
  api.post("/task", data);

export const updateTask = (id, data) =>
  api.put(`/task/${id}`, data);

export const deleteTask = (id) =>
  api.delete(`/task/${id}`);

// =======================
// 📁 USER APIs
// =======================
export const getUsers = () => api.get("/user");

export const createUser = (data) =>
  api.post("/user", data);

export const updateUser = (id, data) =>
  api.put(`/user/${id}`, data);

export const deleteUser = (id) =>
  api.delete(`/user/${id}`);

// =======================
// 🔐 AUTH APIs
// =======================
export const registerUser = (data) =>
  api.post("/auth/register", data);

export const loginUser = (data) =>
  api.post("/auth/login", data);

// =======================
// 📊 ACTIVITY LOGS
// =======================
export const getLogs = () =>
  api.get("/activitylog");

// =======================
// 💬 COMMENTS APIs
// =======================
export const getComments = (taskId) =>
  api.get(`/comment/task/${taskId}`);

export const addComment = (data) =>
  api.post("/comment", data);

export default api;