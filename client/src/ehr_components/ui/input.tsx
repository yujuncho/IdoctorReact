import React, { useState, useEffect } from "react";

export interface Prop {
  value: string;
  name: string;
  placeholder?: string;
  append?: string;
  type?: string;
  onChange: (name: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  validateValue?: (value: string) => boolean;
  formatValue?: (value: string) => string;
  formSubmitted?: boolean;
}

const Input = (props: Prop) => {
  let {
    value,
    name,
    onChange,
    placeholder,
    append = "",
    type = "text",
    validateValue,
    formatValue,
    errorMessage,
    formSubmitted
  } = props;

  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (formSubmitted) {
      setTouched(true);
    }
  }, [formSubmitted]);

  const showError = validateValue ? !validateValue(value) && touched : false;
  value = formatValue ? formatValue(value) : value;

  function _onChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(name, event);
  }

  function _onBlur() {
    setTouched(true);
  }

  function getInput() {
    return (
      <div className="d-flex flex-column justify-content-center w-100">
        <input
          type={type}
          className={`form-control ${showError ? "is-invalid" : ""}`}
          id={name}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
          onInput={_onChange}
          onBlur={_onBlur}
        />
        {showError && <small className="text-danger">{errorMessage}</small>}
      </div>
    );
  }

  return (
    <>
      {Boolean(append) ? (
        <div className="input-group">
          {getInput()}
          <div className="input-group-append">
            <span className="input-group-text">{append}</span>
          </div>
        </div>
      ) : (
        getInput()
      )}
    </>
  );
};

export default Input;
