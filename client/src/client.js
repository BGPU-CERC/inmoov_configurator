import axios from "axios";

export const client = axios.create({
  baseURL: location.origin + "/api",
  timeout: 60 * 1000,
});

client.interceptors.response.use(
  (value) => {
    return value.data;
  },
  (error) => {
    throw error;
  }
);
