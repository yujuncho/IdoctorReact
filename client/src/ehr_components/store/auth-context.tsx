import React from "react";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {}
});

export const AuthContextProvider = AuthContext.Provider;
