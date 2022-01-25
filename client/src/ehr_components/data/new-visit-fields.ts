import { labInvOptions, reviewsOptions, yesOrNoOptions } from "./visit";

export interface PatientVisit {
  id: string;
  patient: string;
  date: string;
  complaint: string;
  present_illness_history: string;
  other_system_review: string;
  bp_dia: string;
  bp_sys: string;
  pulse_rate: string;
  temperature: string;
  respiratory_rate: string;
  spo2: string;
  weight: string;
  height: string;
  bmi: string;
  lab_investigation: string;
  diagnosis: string;
  treatment: string;
  is_free: string;
  is_review: string;
  is_referred: string;
  cost: string;
  notes: string;
}

interface NewVisitFieldParams {
  onChangeHandler: (
    fieldName: string,
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  isFormSubmitted: boolean;
  formData: PatientVisit;
}

export default function generateNewVisitFields(params: NewVisitFieldParams) {
  let { onChangeHandler, isFormSubmitted, formData } = params;

  let fieldData = [
    {
      label: "Date of Visit",
      name: "date",
      type: "Input",
      inputType: "date",
      placeholder: "Enter the date of visit",
      onChange: onChangeHandler,
      value: formData.date,
      validateValue: (value: string) => {
        let dateRegex = /\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/;
        return dateRegex.test(value);
      },
      errorMessage: "Please select a date",
      isFormSubmitted: isFormSubmitted
    },
    {
      label: "Chief Complaint",
      name: "complaint",
      placeholder: "Add details about the complaint",
      type: "Textarea",
      onChange: onChangeHandler,
      value: formData.complaint,
      validateValue: (value: string) => {
        return value.length > 0;
      },
      errorMessage: "Please enter the chief complaint",
      isFormSubmitted: isFormSubmitted
    },

    {
      label: "History of Present Illness",
      placeholder: "Add details about the history of the present illness",
      name: "present_illness_history",
      type: "Textarea",
      onChange: onChangeHandler,
      value: formData.present_illness_history
    },
    {
      label: "Review of Other System",
      name: "other_system_review",
      type: "Radio",
      value: formData.other_system_review,
      options: reviewsOptions,
      onChange: onChangeHandler
    },
    {
      name: "blood_pressure"
    },
    {
      label: "Pulse Rate",
      name: "pulse_rate",
      type: "Input",
      placeholder: "",
      value: formData.pulse_rate,
      append: "beats/minute",
      onChange: onChangeHandler
    },
    {
      label: "Body Temperature",
      name: "temperature",
      type: "Input",
      placeholder: "",
      value: formData.temperature,
      append: "°C",
      onChange: onChangeHandler
    },
    {
      label: "Respiratory Rate",
      name: "respiratory_rate",
      type: "Input",
      placeholder: "",
      value: formData.respiratory_rate,
      append: "breaths/minute",
      onChange: onChangeHandler
    },
    {
      label: "Spo2",
      name: "spo2",
      type: "Input",
      placeholder: "",
      value: formData.spo2,
      append: "%",
      onChange: onChangeHandler
    },
    {
      label: "Weight",
      name: "weight",
      type: "Input",
      placeholder: "",
      append: "KG",
      value: formData.weight,
      onChange: onChangeHandler
    },
    {
      label: "Height",
      name: "height",
      type: "Input",
      placeholder: "",
      append: "Mts",
      value: formData.height,
      onChange: onChangeHandler
    },
    {
      label: "Body Mass Index",
      name: "bmi",
      type: "Input",
      placeholder: "",
      value: formData.bmi,
      append: "kg/m2",
      onChange: onChangeHandler
    },
    {
      label: "Imaging and laboratory Investigations",
      name: "lab_investigation",
      type: "Radio",
      value: formData.lab_investigation,
      options: labInvOptions,
      onChange: onChangeHandler
    },
    {
      label: "Diagnosis",
      name: "diagnosis",
      type: "Textarea",
      placeholder: "Add details about the diagnosis",
      onChange: onChangeHandler,
      value: formData.diagnosis
    },
    {
      label: "Treatment",
      name: "treatment",
      type: "Textarea",
      placeholder: "Add details about the treatments followed",
      onChange: onChangeHandler,
      value: formData.treatment
    },
    {
      label: "Free Visit",
      name: "is_free",
      type: "Radio",
      options: yesOrNoOptions,
      onChange: onChangeHandler,
      value: formData.is_free
    },
    {
      label: "Visit Review",
      name: "is_review",
      type: "Radio",
      options: yesOrNoOptions,
      onChange: onChangeHandler,
      value: formData.is_review
    },
    {
      label: "Referred",
      name: "is_referred",
      type: "Radio",
      options: yesOrNoOptions,
      onChange: onChangeHandler,
      value: formData.is_referred
    },
    {
      label: "Visit Cost",
      name: "cost",
      type: "Input",
      onChange: onChangeHandler,
      value: formData.cost
    },
    {
      label: "Notes",
      name: "notes",
      type: "Textarea",
      placeholder:
        "Add any other notes about the visit here for future references",
      onChange: onChangeHandler,
      value: formData.notes
    }
  ];

  return fieldData;
}
