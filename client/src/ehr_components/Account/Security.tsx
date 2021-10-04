import { useState } from "react";

import FieldRenderer from "../common_components/field-renderer";
import generateSecurityFields from "./data/security-fields";

export default function Security() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
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

  let fieldsMap = generateSecurityFields({
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

  return (
    <div className="card justify-content-center mt-5">
      <h2 className="card-header">Security</h2>
      <div className="card-body">
        <form className="align-content-center" noValidate>
          {fieldsMap.map((field: { name: string }) => {
            return <FieldRenderer field={field} key={field.name} />;
          })}
          <div className="form-group mt-4">
            <button className="btn btn-secondary">Update Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}
