import React from "react";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  uid: "",
  username: "",
  token: "",
  email: "",
  loginAt: new Date(),
  isDeactivated: false,
  login: (
    uid: string,
    username: string,
    token: string,
    email: string,
    loginAt: Date,
    isDeactivated: boolean
  ) => {},
  logout: () => {}
});

export const AuthContextProvider = AuthContext.Provider;
