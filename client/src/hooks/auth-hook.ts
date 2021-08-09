import { useState, useEffect, useCallback } from "react";

const userDataDefault = {
  uid: "",
  token: ""
};

export const useAuth = () => {
  const [userData, setUserData] = useState(userDataDefault);

  const login = useCallback((uid: string, token: string) => {
    setUserData({ uid, token });
    localStorage.setItem("userData", JSON.stringify({ uid, token }));
  }, []);

  const logout = useCallback(() => {
    setUserData(userDataDefault);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    let storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const { uid, token } = JSON.parse(storedUserData);
      login(uid, token);
    }
  }, [login]);

  return { login, logout, userData };
};
