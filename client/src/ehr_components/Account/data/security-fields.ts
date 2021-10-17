interface SecurityFieldParams {
  onChangeHandler: (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  isFormSubmitted: boolean;
  formData: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
}

export default function generateSecurityFields(params: SecurityFieldParams) {
  let { onChangeHandler, isFormSubmitted, formData } = params;

  let fieldsMap = [
    {
      label: "Current password",
      name: "currentPassword",
      type: "Input",
      inputType: "password",
      placeholder: "Current password",
      onChange: onChangeHandler,
      validateValue: (value: string) => {
        return value.length > 0;
      },
      value: formData.currentPassword,
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
