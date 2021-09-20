import { useHistory } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import React, { useState, useEffect } from "react";

import Field from "./ui/Field";
import TextArea from "./ui/Textarea";
import Radio from "./ui/Radio";
import AutoComplete from "./ui/AutoComplete";
import { bloodGroups, diseases, yesOrNoOptions } from "./data/patient-history";
import Button from "./ui/button";

export interface HistoryProps {
  added: Function;
}

interface History {
  note?: string;
}
interface User {
  address?: string;
  age?: string;
  dob?: string;
  fullName: string;
  gender?: string;
  job?: string;
  label?: string;
  maritialStatus?: string;
  number?: string;
  history?: History;
}

const initialState: any = {
  fractures: "",
  previous_admission: "no",
  past_surgery: "no",
  drug_allergy: "no",
  chronic_diseases: "",
  chronic_drug_usage: "yes",
  smoking_status: "no",
  alcohol: "yes"
};

const firebaseURl =
  "https://idoctorpwa-default-rtdb.firebaseio.com/patients.json";

const History: React.FC<HistoryProps> = props => {
  let [medicalHistory, setMedicalHistory] = useState(initialState);
  const history = useHistory();
  let currentUser: User = history.location.state as User;

  useEffect(() => {
    console.log("History note: ", currentUser.history?.note);
    setMedicalHistory({ ...medicalHistory, notes: currentUser.history?.note });
  }, []);

  let handleClick = async () => {
    console.log(medicalHistory);

    // try {
    //   var callResults = await Axios.post(firebaseURl, medicalHistory);
    //   //history.push(`/main/search#success`);
    //   toastr.success("Patient Medical History", "Added Successfully");
    // } catch (error) {
    //   toastr.error("Error:", error.message);
    // }
    toastr.success("Patient Medical History", "Added Successfully");
  };

  function handleFieldChange(
    fieldName: string,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    medicalHistory[fieldName] = event.target.value;
    setMedicalHistory({ ...medicalHistory });
  }

  function handleBloodGroupChange(options: Array<any>) {
    let value = options && options[0] ? options[0].value : "";
    medicalHistory.blood_group = value;
    setMedicalHistory({ ...medicalHistory });
  }

  function handleDiseaseChange(options: Array<any>) {
    medicalHistory.chronic_diseases = options;
    setMedicalHistory({ ...medicalHistory });
  }

  return (
    <div>
      <h2 className=" main p-1 mt-4 mb-5">Patient Medical History</h2>

      <div className="mx-auto" style={{ width: "90%" }}>
        <div className="row">
          <form className="col-9">
            <Field name="chronic_diseases" label="Chronic Diseases">
              <AutoComplete
                name="Chronic Diseases"
                placeholder="Chronic Diseases"
                multiple={true}
                options={diseases}
                onSelect={handleDiseaseChange}
              />
            </Field>

            <Field
              name="previous_admission"
              label="Previous Admission to the hospital"
            >
              <>
                <Radio
                  name="previous_admission"
                  options={yesOrNoOptions}
                  value={medicalHistory.previous_admission}
                  onChange={handleFieldChange}
                />
                {medicalHistory.previous_admission === "yes" ? (
                  <TextArea
                    className="mt-2"
                    name="previous_admission_description"
                    placeholder="Add details about the previous admission"
                    value={medicalHistory.previous_admission_description}
                    onChange={handleFieldChange}
                  />
                ) : (
                  <></>
                )}
              </>
            </Field>

            <Field name="past_surgery" label="Past Surgery">
              <>
                <Radio
                  name="past_surgery"
                  options={yesOrNoOptions}
                  value={medicalHistory.past_surgery}
                  onChange={handleFieldChange}
                />
                {medicalHistory.past_surgery === "yes" ? (
                  <TextArea
                    className="mt-2"
                    name="past_surgery_description"
                    placeholder="Add details about the past surgery"
                    value={medicalHistory.past_surgery_description}
                    onChange={handleFieldChange}
                  />
                ) : (
                  <></>
                )}
              </>
            </Field>

            <Field name="fractures" label="Fractures">
              <TextArea
                name="fractures"
                placeholder="Add details about any past fractures"
                value={medicalHistory.fractures}
                onChange={handleFieldChange}
              />
            </Field>

            <Field name="family_history" label="Family History">
              <TextArea
                name="family_history"
                placeholder="Add details about the family history"
                value={medicalHistory.family_history}
                onChange={handleFieldChange}
              />
            </Field>

            <Field name="drug_allergy" label="Drug Allergy">
              <>
                <Radio
                  name="drug_allergy"
                  options={yesOrNoOptions}
                  value={medicalHistory.drug_allergy}
                  onChange={handleFieldChange}
                />
                {medicalHistory.drug_allergy === "yes" ? (
                  <TextArea
                    className="mt-2"
                    name="drug_allergy_description"
                    placeholder="Add details about the drug allergies"
                    value={medicalHistory.drug_allergy_description}
                    onChange={handleFieldChange}
                  />
                ) : (
                  <></>
                )}
              </>
            </Field>

            <Field name="chronic_drug_usage" label="Chronic use of Drugs">
              <Radio
                name="chronic_drug_usage"
                options={yesOrNoOptions}
                value={medicalHistory.chronic_drug_usage}
                onChange={handleFieldChange}
              />
            </Field>

            <Field name="blood_group" label="Blood Group">
              <AutoComplete
                name="Blood Group"
                placeholder="Blood Group"
                options={bloodGroups}
                onSelect={handleBloodGroupChange}
              />
            </Field>

            <Field name="smoking_status" label="Smoking Status">
              <Radio
                name="smoking_status"
                options={yesOrNoOptions}
                value={medicalHistory.smoking_status}
                onChange={handleFieldChange}
              />
            </Field>

            <Field name="alcohol" label="Alcohol Drinking">
              <Radio
                name="alcohol"
                options={yesOrNoOptions}
                value={medicalHistory.alcohol}
                onChange={handleFieldChange}
              />
            </Field>

            <Field name="notes" label="Notes">
              <TextArea
                name="notes"
                placeholder="add any additional notes"
                value={medicalHistory.notes}
                onChange={handleFieldChange}
              />
            </Field>

            <div className="form-group">
              <Button onClick={handleClick}>Add</Button>
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
                <h5 className="card-title">{currentUser.fullName}</h5>
                <a href="#" className="btn btn-primary">
                  Update Image
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
