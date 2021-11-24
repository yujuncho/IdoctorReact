import { useMemo } from "react";
import axios from "axios";

import useAuth from "./useAuth";

export default function useAuthAxios() {
  const { logout } = useAuth();
  const instance = useMemo(() => {
    const instance = axios.create();

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
          logout();
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [logout]);

  return instance;
}
