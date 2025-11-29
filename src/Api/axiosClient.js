import axios from "axios";
import { getToken } from "../Store/authStore";

const axiosClient = axios.create({
  baseURL: "https://localhost:7111/api", // base de tus controladores API
  headers: { "Content-Type": "application/json" }
});

axiosClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;