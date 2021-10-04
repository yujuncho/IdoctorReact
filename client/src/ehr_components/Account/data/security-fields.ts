interface SecurityFieldParams {
  onChangeHandler: (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  isFormSubmitted: boolean;
  formData: {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
}

export default function generateSecurityFields(params: SecurityFieldParams) {
  let { onChangeHandler, isFormSubmitted, formData } = params;

  let fieldsMap = [
    {
      label: "Old password",
      name: "oldPassword",
      type: "Input",
      inputType: "password",
      placeholder: "Old password",
      onChange: onChangeHandler,
      validateValue: (value: string) => {
        return value.length > 0;
      },
      value: formData.oldPassword,
      errorMessage: "Please enter a valid password",
      isFormSubmitted: isFormSubmitted,
      isFormRow: false,
      showRequiredIcon: false
    },
    {
      label: "New password",
      name: "newPassword",
      type: "Input",
      inputType: "password",
      placeholder: "New password",
      onChange: onChangeHandler,
      validateValue: (value: string) => {
        return value.length > 0;
      },
      value: formData.newPassword,
      errorMessage: "Please enter a valid password",
      isFormSubmitted: isFormSubmitted,
      isFormRow: false,
      showRequiredIcon: false
    },
    {
      label: "Confirm new password",
      name: "confirmNewPassword",
      type: "Input",
      inputType: "password",
      placeholder: "Confirm new password",
      onChange: onChangeHandler,
      validateValue: (value: string) => {
        return (
          value.length > 0 &&
          formData.newPassword === formData.confirmNewPassword
        );
      },
      value: formData.confirmNewPassword,
      errorMessage: "Please make sure the new passwords match",
      isFormSubmitted: isFormSubmitted,
      isFormRow: false,
      showRequiredIcon: false
    }
  ];

  return fieldsMap;
}
