import { Fragment, useState, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import { AuthContext } from "./store/auth-context";
import FieldRenderer from "./common_components/field-renderer";

enum AuthPage {
  LOGIN = "Log In",
  SIGNUP = "Sign Up"
}

export default function Auth() {
  const authContext = useContext(AuthContext);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const history = useHistory();
  const location = useLocation();
  const page =
    location.pathname === "/login" ? AuthPage.LOGIN : AuthPage.SIGNUP;

  const updateFormData = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value
    });
  };

  let fieldsMap = [
    {
      label: "Email",
      name: "email",
      type: "Input",
      inputType: "text",
      isFormRow: false,
      onChange: updateFormData,
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
      onChange: updateFormData,
      validateValue: (value: string) => {
        return value.length > 0;
      },
      value: formData.password,
      errorMessage: "Please enter a password",
      isFormSubmitted: isFormSubmitted
    }
  ];

  const formIsValid = fieldsMap.reduce(
    (
      previousValue: boolean,
      currentField: {
        validateValue?: (value: string) => boolean;
        value: string;
      }
    ) => {
      if (currentField.validateValue) {
        return previousValue && currentField.validateValue(currentField.value);
      } else {
        return previousValue;
      }
    },
    true
  );

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFormSubmitted(true);

    if (formIsValid) {
      try {
        // let callResults = await Axios.post(firebaseURl, formData);
        authContext.login();
        history.push("/main");
      } catch (error) {
        alert(error.message);
      }
    }
  };

  let switchAuthPage;
  if (page === AuthPage.SIGNUP) {
    switchAuthPage = (
      <Fragment>
        Already have an account?
        <Link to="/login" className="ml-1">
          Log in
        </Link>
      </Fragment>
    );
  } else {
    switchAuthPage = (
      <Fragment>
        Don't have an account?
        <Link to="/signup" className="ml-1">
          Sign up
        </Link>
      </Fragment>
    );
  }

  return (
    <div className="container">
      <h2 className="mt-5 mb-3">{page}</h2>
      <div className="row justify-content-center">
        <form
          className="align-content-center w-25"
          onSubmit={loginHandler}
          noValidate
        >
          {fieldsMap.map((field: { name: string }) => {
            return <FieldRenderer field={field} key={field.name} />;
          })}

          <div className="form-group mt-4">
            <button className="bttn-custom">{page}</button>
          </div>

          <div className="form-row mt-5 pt-4 border-top border-dark justify-content-center">
            {switchAuthPage}
          </div>
        </form>
      </div>
    </div>
  );
}
