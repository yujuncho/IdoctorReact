import { useState, useEffect, useCallback } from "react";

interface UserData {
  uid: string;
  username: string;
  email: string;
  token: string;
  loginAt: Date;
}

const userDataDefault: UserData = {
  uid: "",
  username: "",
  email: "",
  token: "",
  loginAt: new Date()
};

export const useAuth = () => {
  const [userData, setUserData] = useState(userDataDefault);
  const [checkedStorage, setCheckingStorage] = useState(false);

  const login = useCallback(
    (
      uid: string,
      username: string,
      token: string,
      email: string,
      loginAt: Date
    ) => {
      setUserData({ uid, username, token, email, loginAt });
      localStorage.setItem(
        "userData",
        JSON.stringify({ uid, username, token, email, loginAt })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setUserData(userDataDefault);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    let storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const { uid, username, token, email, loginAt } =
        JSON.parse(storedUserData);
      login(uid, username, token, email, new Date(loginAt));
    }
    setCheckingStorage(true);
  }, [login]);

  return { login, logout, userData, checkedStorage };
};
