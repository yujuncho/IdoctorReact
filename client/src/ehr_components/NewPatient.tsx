import { useHistory } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import React, { useState } from "react";
import Axios from "axios";

import FieldRenderer from "./common_components/field-renderer";
import generateNewPatientFields from "./data/new-patient-fields";

export interface NewPatientProps {
  added: Function;
}

export interface PatientHistory {
  chronic_diseases: string;
  previous_admission: string;
  past_surgery: string;
  fractures: string;
  family_history: string;
  drug_allergy: string;
  chronic_drug_usage: string;
  smoking_status: string;
  alcohol: string;
  notes: string;
}

export interface Patient {
  id?: string;
  fullName: string;
  dob: string;
  phoneNumber: string;
  address: string;
  zipCode: string;
  gender: string;
  job: string;
  maritalStatus: string;
  history?: PatientHistory;
}

const NewPatient: React.FC<NewPatientProps> = props => {
  const history = useHistory();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<Patient>({
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
        let patientData = {
          ...formData,
          phoneNumber: formData.phoneNumber.replace(/[^\d]/g, "")
        };
        let response = await Axios.post("/api/patient", patientData);
        console.log("CREATED PATIENT", response.data.patient);
        toastr.success("New Patient", "Added Successfuly");
        history.push(`/main/search`);
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
        toastr.error("New Patient", message);
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
