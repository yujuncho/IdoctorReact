import {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext
} from "react";

interface UserData {
  uid: string;
  username: string;
  email: string;
  token: string;
  loginAt: Date;
  isDeactivated: boolean;
}

const userDataDefault: UserData = {
  uid: "",
  username: "",
  email: "",
  token: "",
  loginAt: new Date(),
  isDeactivated: false
};

const AuthContext = createContext({
  login: (
    uid: string,
    username: string,
    token: string,
    email: string,
    loginAt: Date,
    isDeactivated: boolean
  ) => {},
  logout: () => {},
  isLoggedIn: false,
  userData: {
    uid: "",
    username: "",
    token: "",
    email: "",
    loginAt: new Date(),
    isDeactivated: false
  },
  checkedStorage: false
});

export function AuthProvider({
  children
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [userData, setUserData] = useState(userDataDefault);
  const [checkedStorage, setCheckingStorage] = useState(false);

  const login = useCallback(
    (
      uid: string,
      username: string,
      token: string,
      email: string,
      loginAt: Date,
      isDeactivated: boolean
    ) => {
      setUserData({ uid, username, token, email, loginAt, isDeactivated });
      localStorage.setItem(
        "userData",
        JSON.stringify({ uid, username, token, email, loginAt, isDeactivated })
      );
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("userData");
    setUserData(userDataDefault);
  }, []);

  useEffect(() => {
    let storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const { uid, username, token, email, loginAt, isDeactivated } =
        JSON.parse(storedUserData);
      login(uid, username, token, email, new Date(loginAt), isDeactivated);
    }
    setCheckingStorage(true);
  }, [login]);

  let value = {
    isLoggedIn: !!userData.token,
    login,
    logout,
    userData,
    checkedStorage
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
  return useContext(AuthContext);
}
