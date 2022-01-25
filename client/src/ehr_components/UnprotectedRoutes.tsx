import { Redirect } from "react-router";

import useAuth from "../hooks/useAuth";
import Loader from "./ui/Loader";

export default function UnprotectedRoutes({
  children
}: {
  children: JSX.Element | JSX.Element[];
}) {
  let auth = useAuth();

  if (!auth.checkedStorage) {
    return <Loader />;
  }

  if (auth.isLoggedIn) {
    console.log("REDIRECT TO MAIN");
    return <Redirect to="/main" />;
  }

  return <>{children}</>;
}
