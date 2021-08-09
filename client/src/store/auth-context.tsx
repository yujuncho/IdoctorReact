import React from "react";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  uid: "",
  token: "",
  login: (uid: string, token: string) => {},
  logout: () => {}
});

export const AuthContextProvider = AuthContext.Provider;
