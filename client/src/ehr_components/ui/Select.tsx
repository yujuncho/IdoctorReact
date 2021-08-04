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

  const showError = validateValue
    ? !validateValue(value) && isFormSubmitted
    : false;

  function _onChange(event: any) {
    onChange(name, event);
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
