interface DeactivateFieldParams {
  onChangeHandler: (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  isFormSubmitted: boolean;
  formData: {
    password: string;
  };
}

export default function generateDeactivateFields(
  params: DeactivateFieldParams
) {
  let { onChangeHandler, isFormSubmitted, formData } = params;

  let fieldsMap = [
    {
      label: "Password",
      name: "password",
      type: "Input",
      inputType: "password",
      placeholder: "Password",
      onChange: onChangeHandler,
      validateValue: (value: string) => {
        return value.length > 0;
      },
      value: formData.password,
      errorMessage: "Please enter a valid password",
      isFormSubmitted: isFormSubmitted,
      isFormRow: false,
      showRequiredIcon: false
    }
  ];

  return fieldsMap;
}
