import { Redirect } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import Loader from "./ui/Loader";

export default function ProtectedRoutes({
  children
}: {
  children: JSX.Element | JSX.Element[];
}) {
  let auth = useAuth();

  if (!auth.checkedStorage) {
    return <Loader />;
  }

  if (!auth.isLoggedIn) {
    console.log("REDIRECT TO LANDING");
    return <Redirect to="/" />;
  }

  return <>{children}</>;
}
