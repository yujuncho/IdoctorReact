import React from "react";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  uid: "",
  username: "",
  token: "",
  email: "",
  loginAt: new Date(),
  login: (
    uid: string,
    username: string,
    token: string,
    email: string,
    loginAt: Date
  ) => {},
  logout: () => {}
});

export const AuthContextProvider = AuthContext.Provider;
