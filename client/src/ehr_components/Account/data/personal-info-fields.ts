interface PersonalInfoParams {
  onChangeHandler: (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  isFormSubmitted: boolean;
  formData: {
    username: string;
    email: string;
  };
}

export default function generatePersonalInfoFields(params: PersonalInfoParams) {
  let { onChangeHandler, isFormSubmitted, formData } = params;

  let fieldsMap = [
    {
      label: "Username",
      name: "username",
      type: "Input",
      inputType: "text",
      placeholder: "Username",
      onChange: onChangeHandler,
      value: formData.username,
      isFormRow: false,
      showRequiredIcon: false
    },
    {
      label: "Email",
      name: "email",
      type: "Input",
      inputType: "text",
      placeholder: "Email",
      onChange: onChangeHandler,
      validateValue: (value: string) => {
        let emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(value);
      },
      value: formData.email,
      errorMessage: "Please enter a valid email",
      isFormSubmitted: isFormSubmitted,
      isFormRow: false,
      showRequiredIcon: false
    }
  ];

  return fieldsMap;
}
