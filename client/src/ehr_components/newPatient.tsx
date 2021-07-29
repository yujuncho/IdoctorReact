import { useHistory } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import React, { useState } from "react";
import Axios from "axios";

import FieldRenderer from "./common_components/field-renderer";
import Select from "./ui/Select";

export interface NewPatientProps {
  added: Function;
}

const NewPatient: React.FC<NewPatientProps> = props => {
  const history = useHistory();
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

  let handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let callResults = await Axios.post(firebaseURl, formData);
      console.log(callResults);
      history.push(`/main/search#success`);
    } catch (error) {
      toastr.error("New Patient", error.message);
    }
  };

  let fieldsMap = [
    {
      label: "Name",
      name: "fullName",
      type: "Input",
      inputType: "text",
      placeholder: "Full Name",
      onChange: updateFormData,
      value: formData.fullName
    },
    {
      label: "Date of Birth",
      name: "dob",
      type: "Input",
      inputType: "date",
      onChange: updateFormData,
      value: formData.dob
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
      value: formData.gender
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      type: "Input",
      inputType: "text",
      placeholder: "Phone Number",
      onChange: updateFormData,
      value: formData.phoneNumber
    },
    {
      label: "Address",
      name: "address",
      type: "Input",
      inputType: "text",
      placeholder: "Address",
      onChange: updateFormData,
      value: formData.address
    },
    {
      label: "Zip Code",
      name: "zipCode",
      type: "Input",
      inputType: "text",
      placeholder: "Zip Code",
      onChange: updateFormData,
      value: formData.zipCode
    },
    {
      label: "Job",
      name: "job",
      type: "Input",
      inputType: "text",
      placeholder: "Job",
      onChange: updateFormData,
      value: formData.job
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
      ]
    }
  ];

  return (
    <div className="container">
      <h2>New Patient</h2>
      <br />
      <div className="row  justify-content-center">
        <form className="w-75   align-content-center" onSubmit={handleClick}>
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
