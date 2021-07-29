import { useHistory } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import React, { useState } from "react";
import Axios from "axios";

import FieldRenderer from "./common_components/field-renderer";
import { stringify } from "querystring";

export interface NewPatientProps {
  added: Function;
}

const NewPatient: React.FC<NewPatientProps> = props => {
  const history = useHistory();
  const [formSubmitted, setFormSubmitted] = useState(false);
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

  let fieldsMap = [
    {
      label: "Name",
      name: "fullName",
      type: "Input",
      inputType: "text",
      placeholder: "Full Name",
      onChange: updateFormData,
      validateValue: (value: string) => {
        return value.length > 0;
      },
      value: formData.fullName,
      errorMessage: "Please enter your name",
      formSubmitted: formSubmitted
    },
    {
      label: "Date of Birth",
      name: "dob",
      type: "Input",
      inputType: "date",
      onChange: updateFormData,
      validateValue: (value: string) => {
        let dateRegex = /\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/;
        return dateRegex.test(value);
      },
      value: formData.dob,
      errorMessage: "Please select a date",
      formSubmitted: formSubmitted
    },
    {
      label: "Gender",
      name: "gender",
      type: "Radio",
      options: [
        {
          value: "male",
          label: "Male"
        },
        {
          value: "female",
          label: "Female"
        },
        {
          value: "intersex",
          label: "Intersex"
        },
        {
          value: "other",
          label: "Other"
        },
        {
          value: "undisclosed",
          label: "Undisclosed"
        }
      ],
      onChange: updateFormData,
      value: formData.gender,
      validateValue: (value: string) => {
        return value.length > 0;
      },
      errorMessage: "Please select a gender",
      formSubmitted: formSubmitted
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      type: "Input",
      inputType: "text",
      placeholder: "Phone Number",
      onChange: updateFormData,
      validateValue: (value: string) => {
        let countDigitsRegex = /\d/g;
        let regexMatch = value.match(countDigitsRegex);
        return regexMatch !== null ? regexMatch.length === 10 : false;
      },
      formatValue: (value: string) => {
        if (!value) return value;

        const phoneNumber = value.replace(/[^\d]/g, "");
        const phoneNumberLength = phoneNumber.length;

        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
          return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
          3,
          6
        )}-${phoneNumber.slice(6)}`;
      },
      value: formData.phoneNumber,
      errorMessage: "Please enter a 10 digit phone number",
      formSubmitted: formSubmitted
    },
    {
      label: "Address",
      name: "address",
      type: "Input",
      inputType: "text",
      placeholder: "Address",
      onChange: updateFormData,
      validateValue: (value: string) => {
        return value.length > 0;
      },
      value: formData.address,
      errorMessage: "Please enter a address",
      formSubmitted: formSubmitted
    },
    {
      label: "Zip Code",
      name: "zipCode",
      type: "Input",
      inputType: "text",
      placeholder: "Zip Code",
      onChange: updateFormData,
      validateValue: (value: string) => {
        let countDigitsRegex = /\d/g;
        let regexMatch = value.match(countDigitsRegex);
        return regexMatch !== null ? regexMatch.length === 5 : false;
      },
      value: formData.zipCode,
      errorMessage: "Please enter a 5 digit zip code",
      formSubmitted: formSubmitted
    },
    {
      label: "Job",
      name: "job",
      type: "Input",
      inputType: "text",
      placeholder: "Job",
      onChange: updateFormData,
      validateValue: (value: string) => {
        return value.length > 0;
      },
      value: formData.job,
      errorMessage: "Please enter a job",
      formSubmitted: formSubmitted
    },
    {
      label: "Marital Status",
      name: "maritalStatus",
      type: "Select",
      value: formData.maritalStatus,
      onChange: updateFormData,
      placeholder: "Select Marital Status",
      options: [
        { value: "S", label: "Single" },
        { value: "M", label: "Married" },
        { value: "D", label: "Divorced" },
        { value: "W", label: "Widow" }
      ],
      validateValue: (value: string) => {
        return value.length > 0;
      },
      errorMessage: "Please select a marital status",
      formSubmitted: formSubmitted
    }
  ];

  const formIsValid = fieldsMap.reduce((previousValue, currentField) => {
    if (currentField.validateValue) {
      return previousValue && currentField.validateValue(currentField.value);
    } else {
      return previousValue;
    }
  }, true);

  let handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);

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
          {fieldsMap.map(field => {
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
