import { PatientHistory } from "../NewPatient";
import { yesOrNoOptions } from "./patient-history";

interface PatientHistoryFieldsParams {
  onChangeHandler: (
    fieldName: string,
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  changedField: string;
  formData: PatientHistory;
}

export default function generatePatientHistoryFields(
  params: PatientHistoryFieldsParams
) {
  let { onChangeHandler, changedField, formData } = params;

  let fieldData = [
    {
      name: "chronic_diseases"
    },
    {
      label: "Previous Admission to the Hospital",
      name: "previous_admission",
      type: "Radio",
      value: formData.previous_admission,
      options: yesOrNoOptions,
      onChange: onChangeHandler
    },
    {
      label: "Previous Admission Description",
      name: "previous_admission_description",
      type: "Textarea",
      placeholder: "Add details about the previous admission",
      onChange: onChangeHandler,
      value: formData.previous_admission_description,
      display: formData.previous_admission === "yes",
      fadeIn:
        formData.previous_admission === "yes" &&
        changedField === "previous_admission"
    },
    {
      label: "Past Surgery",
      name: "past_surgery",
      type: "Radio",
      value: formData.past_surgery,
      options: yesOrNoOptions,
      onChange: onChangeHandler
    },
    {
      label: "Past Surgery Description",
      name: "past_surgery_description",
      type: "Textarea",
      placeholder: "Add details about the past surgery",
      onChange: onChangeHandler,
      value: formData.past_surgery_description,
      display: formData.past_surgery === "yes",
      fadeIn: formData.past_surgery === "yes" && changedField === "past_surgery"
    },
    {
      label: "Fractures",
      name: "fractures",
      type: "Textarea",
      placeholder: "Add details about any past fractures",
      onChange: onChangeHandler,
      value: formData.fractures
    },
    {
      label: "Family History",
      name: "family_history",
      type: "Textarea",
      placeholder: "Add details about the family history",
      onChange: onChangeHandler,
      value: formData.family_history
    },
    {
      label: "Drug Allergy",
      name: "drug_allergy",
      type: "Radio",
      value: formData.drug_allergy,
      options: yesOrNoOptions,
      onChange: onChangeHandler
    },
    {
      label: "Drug Allergy Description",
      name: "drug_allergy_description",
      type: "Textarea",
      placeholder: "Add details about drug allergies",
      onChange: onChangeHandler,
      value: formData.drug_allergy_description,
      display: formData.drug_allergy === "yes",
      fadeIn: formData.drug_allergy === "yes" && changedField === "drug_allergy"
    },
    {
      label: "Chronic Use of Drugs",
      name: "chronic_drug_usage",
      type: "Radio",
      value: formData.chronic_drug_usage,
      options: yesOrNoOptions,
      onChange: onChangeHandler
    },
    {
      name: "blood_group"
    },
    {
      label: "Smoking Status",
      name: "smoking_status",
      type: "Radio",
      value: formData.smoking_status,
      options: yesOrNoOptions,
      onChange: onChangeHandler
    },
    {
      label: "Alcohol Drinking",
      name: "alochol",
      type: "Radio",
      value: formData.alcohol,
      options: yesOrNoOptions,
      onChange: onChangeHandler
    },
    {
      label: "Notes",
      name: "notes",
      type: "Textarea",
      placeholder: "Add any additional notes",
      onChange: onChangeHandler,
      value: formData.notes
    }
  ];

  return fieldData;
}
