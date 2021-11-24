import { useState } from "react";
import Axios from "axios";

import useAuth from "../hooks/useAuth";
import Alert from "./ui/Alert";

export default function Reactivate() {
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const auth = useAuth();

  let handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    try {
      await Axios.patch("/api/user/activate", {
        id: auth.userData.uid,
        deactivate: false
      });
      console.log("REACTIVATED ACCOUNT");
      const {
        userData: { uid, username, token, email, loginAt }
      } = auth;
      auth.login(uid, username, token, email, loginAt, false);
    } catch (error: any) {
      let message;
      if (error.response) {
        if (error.response.data.errors) {
          let errors = error.response.data.errors as string[];
          message = errors.join(". ");
        } else {
          message = error.response.data.message;
        }
      } else {
        message = error.message;
      }
      setShowAlert(true);
      setAlertMessage(message);
      setIsLoading(false);
    }
  };

  const buttonText = isLoading ? (
    <i className="fa fa-spinner fa-spin" />
  ) : (
    "Reactivate Account"
  );

  return (
    <div className="container mt-5">
      <div className="col-sm-8 col-md-6 col-lg-5 col-xl-4 mx-auto">
        {showAlert && (
          <Alert
            alertType={"alert-danger"}
            message={alertMessage}
            onClose={() => {
              setAlertMessage("");
              setShowAlert(false);
            }}
          />
        )}
        <h1>Reactivate</h1>
        <p>
          Your account was previously deactivated.
          <br />
          Would you like to reactivate your account?
        </p>
        <button className="bttn-custom" onClick={handleClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}
