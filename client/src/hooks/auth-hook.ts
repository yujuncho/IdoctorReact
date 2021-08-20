import { useState, useEffect, useCallback } from "react";

const userDataDefault = {
  uid: "",
  email: "",
  token: ""
};

export const useAuth = () => {
  const [userData, setUserData] = useState(userDataDefault);
  const [checkedStorage, setCheckingStorage] = useState(false);

  const login = useCallback((uid: string, token: string, email: string) => {
    setUserData({ uid, token, email });
    localStorage.setItem("userData", JSON.stringify({ uid, token, email }));
  }, []);

  const logout = useCallback(() => {
    setUserData(userDataDefault);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    let storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const { uid, token, email } = JSON.parse(storedUserData);
      login(uid, token, email);
    }
    setCheckingStorage(true);
  }, [login]);

  return { login, logout, userData, checkedStorage };
};
