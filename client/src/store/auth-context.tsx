import React from "react";

export interface UserData {
  uid: string;
  username: string;
  email: string;
  token: string;
  loginAt: Date;
  isDeactivated: boolean;
}

export const AuthContext = React.createContext({
  isLoggedIn: false,
  userData: {
    uid: "",
    username: "",
    token: "",
    email: "",
    loginAt: new Date(),
    isDeactivated: false
  },
  login: (
    uid: string,
    username: string,
    token: string,
    email: string,
    loginAt: Date,
    isDeactivated: boolean
  ) => {},
  logout: () => {},
  checkedStorage: false
});

export const AuthContextProvider = AuthContext.Provider;
