import { useHistory } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import React, { useState } from "react";
import Axios from "axios";

import FieldRenderer from "./common_components/field-renderer";
import generateNewPatientFields from "./data/new-patient-fields";

interface ObjectKeyAccess {
  [key: string]: string | any[] | PatientHistory | undefined;
}

export interface PatientHistory extends ObjectKeyAccess {
  patient: string;
  chronic_diseases: any[];
  previous_admission: string;
  previous_admission_description: string;
  past_surgery: string;
  past_surgery_description: string;
  fractures: string;
  family_history: string;
  drug_allergy: string;
  drug_allergy_description: string;
  chronic_drug_usage: string;
  blood_group: string;
  smoking_status: string;
  alcohol: string;
  notes: string;
}

export interface Patient extends ObjectKeyAccess {
  id?: string;
  fullName: string;
  dob: string;
  phoneNumber: string;
  address: string;
  zipCode: string;
  gender: string;
  job: string;
  maritalStatus: string;
  profileImage?: string;
  history?: PatientHistory;
}

const NewPatient: React.FC = () => {
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

  const updateFormData = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { value } = event.target;
    setFormData(prevState => {
      let newState = { ...prevState };
      newState[fieldName] = value;
      return newState;
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
      <div className="row mt-4">
        <form
          className="col-12 col-md-10 col-lg-8 mx-auto"
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
