import axios from "axios";

const API = axios.create({
   baseURL: import.meta.env.VITE_API_URL ||  "http://localhost:8080",
});

API.interceptors.request.use((req) => {
  const user = localStorage.getItem("user");
  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }
  return req;
});

export const register = (formData) => API.post("/api/auth/register", formData);
export const login = (formData) => API.post("/api/auth/login", formData);

export const generateStudyMaterial = (text) =>
  API.post("/api/study/generate-study-material", { text });

export const getHistory = () => API.get("/api/study/history");
