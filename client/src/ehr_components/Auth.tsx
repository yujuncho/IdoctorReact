import { useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "./store/auth-context";

export default function Auth() {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const loginHandler = () => {
    authContext.login();
    history.push("/main");
  };

  return (
    <div>
      <button onClick={loginHandler} className=" bttn-custom  ">
        Log In
      </button>
    </div>
  );
}
