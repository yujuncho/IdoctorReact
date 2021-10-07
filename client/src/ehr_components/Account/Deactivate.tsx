import React, { useState, useContext } from "react";
import Axios from "axios";

import { AuthContext } from "../../store/auth-context";
import generateDeactivateFields from "./data/deactivate-fields";
import FieldRenderer from "../common_components/field-renderer";
import Alert from "../ui/Alert";

export default function Deactivate() {
  const authContext = useContext(AuthContext);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    id: authContext.uid,
    password: "",
    deactivate: true
  });

  const updateFormData = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value
    });
  };

  let fieldsMap = generateDeactivateFields({
    onChangeHandler: updateFormData,
    isFormSubmitted,
    formData
  });

  const formIsValid = fieldsMap.reduce(
    (
      previousValue: boolean,
      currentField: {
        validateValue?: (value: string) => boolean;
        value: string;
      }
    ) => {
      if (currentField.validateValue) {
        return previousValue && currentField.validateValue(currentField.value);
      } else {
        return previousValue;
      }
    },
    true
  );

  let handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsFormSubmitted(true);

    if (formIsValid) {
      setIsLoading(true);
      try {
        await Axios.patch("/api/user/activate", formData);
        console.log("DEACTIVATED ACCOUNT");
        authContext.logout();
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
    }
  };

  const buttonText = isLoading ? (
    <i className="fa fa-spinner fa-spin" />
  ) : (
    "Deactivate Account"
  );

  return (
    <div className="card justify-content-center mt-5">
      <h2 className="card-header">Deactivate</h2>
      <div className="card-body">
        <form className="align-content-center" noValidate>
          {fieldsMap.map((field: { name: string }) => {
            return <FieldRenderer field={field} key={field.name} />;
          })}
        </form>
      </div>
      <div className="card-footer bg-white">
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
        <button
          className="btn rounded btn-danger text-center w-100"
          onClick={handleClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
