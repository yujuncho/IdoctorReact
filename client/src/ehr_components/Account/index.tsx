import { useContext } from "react";

import { AuthContext } from "../../store/auth-context";
import PersonalInfo from "./PersonalInfo";
import Security from "./Security";
import Deactivate from "./Deactivate";

export default function Account() {
  const authContext = useContext(AuthContext);

  let lastLoginTimestamp = authContext.loginAt?.toLocaleDateString("en-us", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit"
  });

  return (
    <div className="container mb-5">
      <div className="col-sm-10 col-md-8 col-lg-6 mx-auto text-left">
        <h1>Account</h1>
        <p>Last Login on {lastLoginTimestamp}</p>
        <PersonalInfo />
        <Security />
        <Deactivate />
      </div>
    </div>
  );
}
