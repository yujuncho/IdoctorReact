import { useState, useEffect } from "react";

export interface SelectProps {
  name: string;
  value: string;
  placeholder: string;
  options: Array<any>;
  onChange: (name: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  validateValue?: (value: string) => boolean;
  isFormSubmitted?: boolean;
}

const Select = (props: SelectProps) => {
  let {
    name,
    options = [],
    value,
    placeholder,
    onChange,
    errorMessage,
    validateValue,
    isFormSubmitted
  } = props;

  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (isFormSubmitted) {
      setTouched(true);
    }
  }, [isFormSubmitted]);

  const showError = validateValue ? !validateValue(value) && touched : false;

  function _onChange(event: any) {
    onChange(name, event);
  }

  function _onBlur() {
    setTouched(true);
  }

  return (
    <div className="d-flex flex-column justify-content-center w-100">
      <select
        className={`form-control ${
          placeholder.length > 0 && value.length > 0 ? "" : "text-muted"
        } ${showError ? "is-invalid" : ""}`}
        id={name}
        value={value}
        onChange={_onChange}
        onBlur={_onBlur}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option: any) => {
          let { value: optionValue, label } = option;
          let uniqueId = `${name}_${optionValue}`;
          return (
            <option value={optionValue} key={uniqueId}>
              {label}
            </option>
          );
        })}
      </select>
      {showError && (
        <small className="text-danger">{errorMessage || "error"}</small>
      )}
    </div>
  );
};

export default Select;
