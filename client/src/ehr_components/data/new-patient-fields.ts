interface NewPatientFieldParams {
  onChangeHandler: (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  isFormSubmitted: boolean;
  formData: {
    fullName: string;
    dob: string;
    phoneNumber: string;
    address: string;
    zipCode: string;
    gender: string;
    job: string;
    maritalStatus: string;
  };
}

export default function generateNewPatientFields(
  params: NewPatientFieldParams
) {
  let { onChangeHandler, isFormSubmitted, formData } = params;
  console.log("Generate Fields!");
  console.log(isFormSubmitted);

  let fieldsMap = [
    {
      label: "Name",
      name: "fullName",
      type: "Input",
      inputType: "text",
      placeholder: "Full Name",
      onChange: onChangeHandler,
      validateValue: (value: string) => {
        return value.length > 0;
      },
      value: formData.fullName,
      errorMessage: "Please enter your name",
      isFormSubmitted: isFormSubmitted
    },
    {
      label: "Date of Birth",
      name: "dob",
      type: "Input",
      inputType: "date",
      onChange: onChangeHandler,
      validateValue: (value: string) => {
        let dateRegex = /\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/;
        return dateRegex.test(value);
      },
      value: formData.dob,
      errorMessage: "Please select a date",
      isFormSubmitted: isFormSubmitted
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
      onChange: onChangeHandler,
      value: formData.gender,
      validateValue: (value: string) => {
        return value.length > 0;
      },
      errorMessage: "Please select a gender",
      isFormSubmitted: isFormSubmitted
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      type: "Input",
      inputType: "text",
      placeholder: "Phone Number",
      onChange: onChangeHandler,
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
      isFormSubmitted: isFormSubmitted
    },
    {
      label: "Address",
      name: "address",
      type: "Input",
      inputType: "text",
      placeholder: "Address",
      onChange: onChangeHandler,
      validateValue: (value: string) => {
        return value.length > 0;
      },
      value: formData.address,
      errorMessage: "Please enter a address",
      isFormSubmitted: isFormSubmitted
    },
    {
      label: "Zip Code",
      name: "zipCode",
      type: "Input",
      inputType: "text",
      placeholder: "Zip Code",
      onChange: onChangeHandler,
      validateValue: (value: string) => {
        let countDigitsRegex = /\d/g;
        let regexMatch = value.match(countDigitsRegex);
        return regexMatch !== null ? regexMatch.length === 5 : false;
      },
      value: formData.zipCode,
      errorMessage: "Please enter a 5 digit zip code",
      isFormSubmitted: isFormSubmitted
    },
    {
      label: "Job",
      name: "job",
      type: "Input",
      inputType: "text",
      placeholder: "Job",
      onChange: onChangeHandler,
      validateValue: (value: string) => {
        return value.length > 0;
      },
      value: formData.job,
      errorMessage: "Please enter a job",
      isFormSubmitted: isFormSubmitted
    },
    {
      label: "Marital Status",
      name: "maritalStatus",
      type: "Select",
      value: formData.maritalStatus,
      onChange: onChangeHandler,
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
      isFormSubmitted: isFormSubmitted
    }
  ];

  return fieldsMap;
}
