import { useHistory } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import React, { useState } from "react";
import Axios from "axios";

import FieldRenderer from "./common_components/field-renderer";
import generateNewPatientFields from "./data/new-patient-fields";

export interface NewPatientProps {
  added: Function;
}

const NewPatient: React.FC<NewPatientProps> = props => {
  const history = useHistory();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    phoneNumber: "",
    address: "",
    zipCode: "",
    gender: "",
    job: "",
    maritalStatus: ""
  });

  const firebaseURl =
    "https://idoctorpwa-default-rtdb.firebaseio.com/patients.json";

  const updateFormData = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value
    });
  };

  let fieldsMap = generateNewPatientFields({
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

  let handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFormSubmitted(true);

    if (formIsValid) {
      try {
        let callResults = await Axios.post(firebaseURl, formData);
        console.log(callResults);
        history.push(`/main/search#success`);
      } catch (error) {
        toastr.error("New Patient", error.message);
      }
    }
  };

  return (
    <div className="container">
      <h2>New Patient</h2>
      <br />
      <div className="row  justify-content-center">
        <form
          className="w-75   align-content-center"
          onSubmit={handleClick}
          noValidate
        >
          {fieldsMap.map((field: { name: string }) => {
            return <FieldRenderer field={field} key={field.name} />;
          })}

          <div className="form-group">
            <button className="bttn-custom">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPatient;
