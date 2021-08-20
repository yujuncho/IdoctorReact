import React from "react";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  uid: "",
  token: "",
  email: "",
  login: (uid: string, token: string, email: string) => {},
  logout: () => {}
});

export const AuthContextProvider = AuthContext.Provider;
