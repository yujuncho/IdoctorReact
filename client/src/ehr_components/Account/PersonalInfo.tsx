import { useState } from "react";

import FieldRenderer from "../common_components/field-renderer";
import generatePersonalInfoFields from "./data/personal-info-fields";

interface PersonalInfoProps {
  email: string;
  username: string;
}

export default function PersonalInfo(props: PersonalInfoProps) {
  let { email, username } = props;
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    username: username,
    email: email
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

  let fieldsMap = generatePersonalInfoFields({
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
      <h2 className="card-header">Personal Info</h2>
      <div className="card-body">
        <form className="align-content-center" noValidate>
          {fieldsMap.map((field: { name: string }) => {
            return <FieldRenderer field={field} key={field.name} />;
          })}
          <div className="form-group mt-4">
            <button className="btn btn-secondary">Update Personal Info</button>
          </div>
        </form>
      </div>
    </div>
  );
}
