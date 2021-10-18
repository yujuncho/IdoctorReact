import { toastr } from "react-redux-toastr";
import { useCallback, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import Axios from "axios";

import FieldRenderer from "./common_components/field-renderer";
import Field from "./ui/Field";
import Input from "./ui/Input";
import PatientImageUpload from "./PatientImageUpload";
import { Patient } from "./NewPatient";
import generateNewVisitFields, { PatientVisit } from "./data/new-visit-fields";

export interface VisitProps {
  added: Function;
}

const initialVisitState: PatientVisit = {
  id: "",
  patient: "",
  date: "",
  complaint: "",
  present_illness_history: "",
  other_system_review: "",
  bp_dia: "",
  bp_sys: "",
  pulse_rate: "",
  temperature: "",
  respiratory_rate: "",
  spo2: "",
  weight: "",
  height: "",
  bmi: "",
  lab_investigation: "",
  diagnosis: "",
  treatment: "",
  is_free: "",
  is_review: "",
  is_referred: "",
  cost: "",
  notes: ""
};

const NewVisit: React.FC<VisitProps> = () => {
  let history = useHistory();
  let { state: patientState } = useLocation<Patient>();

  let [medicalVisit, setMedicalVisit] = useState<PatientVisit>({
    ...initialVisitState,
    patient: patientState?.id || ""
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  let handleFieldChange = useCallback(
    (
      fieldName: string,
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      let { value } = event.target;
      setMedicalVisit(prevState => {
        let newState = { ...prevState };
        newState[fieldName as keyof PatientVisit] = value;
        return newState;
      });
    },
    []
  );

  let fieldData = generateNewVisitFields({
    onChangeHandler: handleFieldChange,
    isFormSubmitted,
    formData: medicalVisit
  });

  const invalidFields = fieldData.flatMap(
    (currentField: {
      validateValue?: (value: string) => boolean;
      value?: string;
      label?: string;
    }) => {
      const { validateValue, value } = currentField;
      if (
        validateValue !== undefined &&
        value !== undefined &&
        !validateValue(value)
      ) {
        return [currentField];
      } else {
        return [];
      }
    }
  );

  let handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFormSubmitted(true);

    if (invalidFields.length === 0) {
      try {
        let response = await Axios.post("/api/visits", medicalVisit);
        console.log("CREATED VISIT", response.data.visit);
        toastr.success("Patient Visit", "Added Successfully");
        history.push("/main/search");
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
    } else {
      let namesOfInvalidFields = invalidFields.map(field => {
        return field.label;
      });
      let message = namesOfInvalidFields.join(", ");
      toastr.error("Invalid Inputs", `Please fix the following: ${message}`);
    }
  };

  let fields = fieldData.map(field => {
    let { name } = field;

    // special handling for blood pressure as it has two different inputs
    if (name === "blood_pressure") {
      return (
        <Field
          name="bp_sys"
          label="Blood Pressure"
          gridSize="col-sm-4"
          isFormRow={true}
          key={name}
        >
          <>
            <Input
              name="bp_sys"
              placeholder="Enter SYS value here"
              value={medicalVisit.bp_sys}
              append="MMHG"
              onChange={handleFieldChange}
            />
            <div className="mt-2">
              <Input
                name="bp_dia"
                placeholder="Enter DIA value here"
                value={medicalVisit.bp_dia}
                append="MMHG"
                onChange={handleFieldChange}
              />
            </div>
          </>
        </Field>
      );
    } else {
      return <FieldRenderer field={field} key={field.name} />;
    }
  });

  if (patientState === undefined) {
    history.push("/main/search");
    return <></>;
  }

  return (
    <div className="container">
      <h2 className="main mb-4">Visit</h2>
      <div className="row">
        <div className="col-md-3 mb-4 mb-md-0">
          <PatientImageUpload
            name={patientState.fullName}
            profileImage={patientState?.profileImage || ""}
          />
        </div>
        <form className="col-md-9" onSubmit={handleClick}>
          {fields}
          <div className="form-group">
            <button className="bttn-custom">Add Visit Details</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewVisit;
