interface AuthFieldsParams {
  onChangeHandler: (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  isFormSubmitted: boolean;
  formData: {
    email: string;
    password: string;
  };
  authType: string;
}

export enum AuthType {
  LOGIN = "Log In",
  SIGNUP = "Sign Up"
}

export default function generateAuthFields(params: AuthFieldsParams) {
  let { onChangeHandler, isFormSubmitted, formData, authType } = params;

  let fieldsMap = [
    {
      label: "Email",
      name: "email",
      type: "Input",
      inputType: "text",
      isFormRow: false,
      onChange: onChangeHandler,
      validateValue: (value: string) => {
        let emailRegex =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(value);
      },
      value: formData.email,
      errorMessage: "Please enter a valid email",
      isFormSubmitted: isFormSubmitted
    },
    {
      label: "Password",
      name: "password",
      type: "Input",
      inputType: "password",
      isFormRow: false,
      onChange: onChangeHandler,
      validateValue: (value: string) => {
        return value.length > 0;
      },
      value: formData.password,
      errorMessage: "Please enter a password",
      isFormSubmitted: isFormSubmitted
    }
  ];

  let linkProperties = {
    description: "",
    path: "",
    text: ""
  };
  if (authType === AuthType.SIGNUP) {
    linkProperties.description = "Already have an account";
    linkProperties.path = "/login";
    linkProperties.text = AuthType.LOGIN;
  } else {
    linkProperties.description = "Don't have an account?";
    linkProperties.path = "/signup";
    linkProperties.text = AuthType.SIGNUP;
  }

  return { fieldsMap, linkProperties };
}
