import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from "axios";

import { AuthContext } from "../store/auth-context";
import FieldRenderer from "../ehr_components/common_components/field-renderer";
import generateAuthFields, { AuthType } from "./data/auth-fields";

import Navigation from "./navigation";

const formDefaultState = {
  email: "",
  password: ""
};

export default function Auth() {
  const authContext = useContext(AuthContext);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState(formDefaultState);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState<null | boolean>(null);

  const { pathname } = useLocation();
  const page = pathname === "/login" ? AuthType.LOGIN : AuthType.SIGNUP;

  useEffect(() => {
    if (isLoginPage && page === AuthType.SIGNUP) {
      setIsLoginPage(false);
    } else if (!isLoginPage && page === AuthType.LOGIN) {
      setIsLoginPage(true);
    }
  }, [isLoginPage, page]);

  useEffect(() => {
    setIsFormSubmitted(false);
    setFormData(formDefaultState);
    setErrorMessage(null);
  }, [isLoginPage]);

  const updateFormData = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value
    });
  };

  let { fieldsMap, linkProperties } = generateAuthFields({
    onChangeHandler: updateFormData,
    formData,
    isFormSubmitted,
    resetToggle: isLoginPage,
    authType: page
  });

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

  const authHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFormSubmitted(true);
    setIsLoading(true);

    if (formIsValid) {
      try {
        let {
          data: { userId, token, email }
        } = await Axios.post(`/api/user${pathname}`, formData);
        authContext.login(userId, token, email);
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage(error.message);
        }
        setIsLoading(false);
      }
    }
  };

  const formError =
    errorMessage === null ? null : (
      <div className="form-row mb-3 p-3 justify-content-center bg-danger text-white">
        <p className="p-0 m-0">{errorMessage}</p>
      </div>
    );

  const authSubmitButtonText = isLoading ? (
    <i className="fa fa-spinner fa-spin" />
  ) : (
    page
  );

  return (
    <div>
      <Navigation isFixed={false} />
      <div className="container">
        <h2 className="mt-5 mb-3">{page}</h2>
        <div className="row justify-content-center">
          <form
            className="align-content-center w-25"
            onSubmit={authHandler}
            noValidate
          >
            {formError}

            {fieldsMap.map((field: { name: string }) => {
              return <FieldRenderer field={field} key={field.name} />;
            })}

            <div className="form-group mb-5">
              <button className="bttn-custom">{authSubmitButtonText}</button>
            </div>

            <div className="form-row pt-4 border-top border-dark justify-content-center">
              {linkProperties.description}
              <Link to={linkProperties.path} className="ml-1">
                {linkProperties.text}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
