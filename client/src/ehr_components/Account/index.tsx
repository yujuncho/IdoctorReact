import { useContext } from "react";

import { AuthContext } from "../../store/auth-context";
import PersonalInfo from "./PersonalInfo";
import Security from "./Security";
import Deactivate from "./Deactivate";

export default function Account() {
  const authContext = useContext(AuthContext);

  return (
    <div className="container mb-5">
      <div className="col-sm-10 col-md-8 col-lg-6 mx-auto text-left">
        <h1>Account</h1>
        <p>Last Login at 3:51pm, Oct 4, 2021</p>
        <PersonalInfo email={authContext.email} username="" />
        <Security />
        <Deactivate />
      </div>
    </div>
  );
}
