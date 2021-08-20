import { toastr } from "react-redux-toastr";
import { useCallback, useState } from "react";
import Button from "./ui/button";
import { labInvOptions, reviewsOptions, yesOrNoOptions } from "./data/visit";
import FieldRenderer from "./common_components/field-renderer";
import Field from "./ui/field";
import Input from "./ui/input";

export interface VisitProps {
  added: Function;
}

const initialState: any = {};

const Visit: React.FC<VisitProps> = () => {
  let [medicalVisit, setMedicalVisit] = useState(initialState);

  let handleClick = () => {
    toastr.success("Patient Medical Visit", "Added Successfully");
    console.log(medicalVisit);
  };

  let handleFieldChange = useCallback(
    (
      fieldName: string,
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      updateState(fieldName, event.target.value);
    },
    []
  );

  let updateState = useCallback(
    (fieldName: string, value: any) => {
      medicalVisit[fieldName] = value;
      setMedicalVisit({ ...medicalVisit });
    },
    [medicalVisit]
  );

  let fieldsMap = [
    {
      label: "Date of Visit",
      name: "date",
      type: "Input",
      inputType: "date",
      placeholder: "Enter the date of visit",
      onChange: handleFieldChange,
      value: medicalVisit.date
    },
    {
      label: "Chief Complaint",
      name: "complaint",
      placeholder: "Add details about the complaint",
      type: "Textarea",
      onChange: handleFieldChange,
      value: medicalVisit.complaint
    },

    {
      label: "History of present illness",
      placeholder: "Add details about the history of the present illness",
      name: "present_illness_history",
      type: "Textarea",
      onChange: handleFieldChange,
      value: medicalVisit.present_illness_history
    },
    {
      label: "Review of other system",
      name: "other_system_review",
      type: "Radio",
      value: medicalVisit.other_system_review,
      options: reviewsOptions,
      onChange: handleFieldChange
    },
    {
      name: "blood_pressure"
    },
    {
      label: "Pulse Rate",
      name: "pulse_rate",
      type: "Input",
      placeholder: "",
      gridSize: "col-sm-4",
      value: medicalVisit.pulse_rate,
      append: "beats/minute",
      onChange: handleFieldChange
    },
    {
      label: "Body Temperature",
      name: "temperature",
      type: "Input",
      gridSize: "col-sm-4",
      placeholder: "",
      value: medicalVisit.temperature,
      append: "°C",
      onChange: handleFieldChange
    },
    {
      label: "Respiratory Rate",
      name: "respiratory_rate",
      type: "Input",
      gridSize: "col-sm-4",
      placeholder: "",
      value: medicalVisit.respiratory_rate,
      append: "breaths/minute",
      onChange: handleFieldChange
    },
    {
      label: "Spo2",
      name: "spo2",
      type: "Input",
      gridSize: "col-sm-4",
      placeholder: "",
      value: medicalVisit.spo2,
      append: "%",
      onChange: handleFieldChange
    },
    {
      label: "Weight",
      name: "weight",
      gridSize: "col-sm-4",
      type: "Input",
      placeholder: "",
      append: "KG",
      value: medicalVisit.weight,
      onChange: handleFieldChange
    },
    {
      label: "Height",
      name: "height",
      gridSize: "col-sm-4",
      type: "Input",
      placeholder: "",
      append: "Mts",
      value: medicalVisit.height,
      onChange: handleFieldChange
    },
    {
      label: "Body Mass Index",
      name: "bmi",
      type: "Input",
      gridSize: "col-sm-4",
      placeholder: "",
      value: medicalVisit.bmi,
      append: "kg/m2",
      onChange: handleFieldChange
    },
    {
      label: "Imaging and laboratory Investigations",
      name: "lab_investigation",
      type: "Radio",
      value: medicalVisit.lab_investigation,
      options: labInvOptions,
      onChange: handleFieldChange
    },
    {
      label: "Diagnosis",
      name: "diagnosis",
      type: "Textarea",
      placeholder: "Add details about the diagnosis",
      onChange: handleFieldChange,
      value: medicalVisit.diagnosis
    },
    {
      label: "Treatment",
      name: "treatment",
      type: "Textarea",
      placeholder: "Add details about the treatments followed",
      onChange: handleFieldChange,
      value: medicalVisit.treatment
    },
    {
      label: "Is the visit free",
      name: "is_free",
      type: "Radio",
      options: yesOrNoOptions,
      onChange: handleFieldChange,
      value: medicalVisit.is_free
    },
    {
      label: "Is the visit review",
      name: "is_review",
      type: "Radio",
      options: yesOrNoOptions,
      onChange: handleFieldChange,
      value: medicalVisit.is_review
    },
    {
      label: "Is referred from other doctor",
      name: "is_referred",
      type: "Radio",
      options: yesOrNoOptions,
      onChange: handleFieldChange,
      value: medicalVisit.is_referred
    },
    {
      label: "Visit Cost",
      name: "cost",
      type: "Input",
      onChange: handleFieldChange,
      value: medicalVisit.cost
    },
    {
      label: "Notes",
      name: "notes",
      type: "Textarea",
      placeholder:
        "Add any other notes about the visit here for future references",
      onChange: handleFieldChange,
      value: medicalVisit.notes
    }
  ];

  return (
    <div>
      <h2 className=" main p-1 mt-4 mb-5">Visit</h2>

      <div className="mx-auto" style={{ width: "90%" }}>
        <div className="row">
          <form className="col-9">
            {fieldsMap.map(field => {
              let { name } = field;

              // special handling for blood pressure as it has two different inputs
              if (name === "blood_pressure") {
                return (
                  <Field
                    name="bp_sys"
                    label="Blood Pressure"
                    gridSize="col-sm-4"
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
            })}

            <div className="form-group">
              <Button onClick={handleClick}>Add Visit Details</Button>
            </div>
          </form>

          <div className="offset-1 col-2">
            <div className="card mr-2">
              <img
                className="card-img-top"
                src="./img/team/02.jpg"
                alt="Patient"
              />
              <div className="card-body">
                <h5 className="card-title">Joey</h5>
                <button className="btn btn-primary">Update Image</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visit;
