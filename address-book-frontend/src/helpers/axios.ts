import axios, { AxiosInstance } from "axios";
import { store } from "../store";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

axiosInstance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.user?.access_token) {
    req.headers.Authorization = `Bearer ${auth.user.access_token}`;
  }
  return req;
});

export default axiosInstance;
