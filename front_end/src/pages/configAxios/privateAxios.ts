import axios from "axios";

const privateAxios = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

privateAxios.interceptors.request.use((config: any) => {
  const jwtTokent = localStorage.getItem("token");
  const token = jwtTokent ? JSON.parse(jwtTokent) : null;
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
});

export default privateAxios;
