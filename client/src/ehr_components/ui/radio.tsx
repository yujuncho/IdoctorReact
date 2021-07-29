import { useState, useEffect } from "react";

export interface Prop {
  name: string;
  value: string;
  options: Array<any>;
  onChange: (name: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  validateValue?: (value: string) => boolean;
  formSubmitted?: boolean;
}

const Radio = (props: Prop) => {
  let {
    name,
    options = [],
    value,
    onChange,
    errorMessage,
    validateValue,
    formSubmitted
  } = props;

  const showError = validateValue
    ? !validateValue(value) && formSubmitted
    : false;

  function _onChange(event: any) {
    onChange(name, event);
  }

  return (
    <div className="d-flex flex-column justify-content-center w-100">
      <div className={`d-flex ${showError ? "is-invalid" : ""}`}>
        {options.map((option: any) => {
          let { value: optionValue, label } = option;
          let uniqueId = `${name}_${optionValue}`;
          return (
            <div className="form-check form-check-inline" key={uniqueId}>
              <input
                className="form-check-input"
                type="radio"
                name={name}
                id={uniqueId}
                value={optionValue}
                checked={value === optionValue}
                onChange={_onChange}
              />
              <label className="form-check-label h6" htmlFor={uniqueId}>
                {label}
              </label>
            </div>
          );
        })}
      </div>
      {showError && <small className="text-danger">{errorMessage}</small>}
    </div>
  );
};

export default Radio;
