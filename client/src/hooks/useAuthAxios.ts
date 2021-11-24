import { useMemo } from "react";
import axios from "axios";

import useAuth from "./useAuth";

export default function useAuthAxios() {
  const auth = useAuth();
  const instance = useMemo(() => axios.create(), []);

  instance.interceptors.request.use(function (config) {
    const userData = localStorage.getItem("userData");
    let token = "";
    if (userData) {
      token = JSON.parse(userData).token;
    }
    config.headers = { authorization: `Bearer ${token}` };
    return config;
  });

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response?.status === 401) {
        auth.logout();
      }
      return Promise.reject(error);
    }
  );

  return instance;
}
