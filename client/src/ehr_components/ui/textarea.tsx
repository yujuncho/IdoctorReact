import { useState, useEffect } from "react";

export interface TextAreaProps {
  value: string;
  name: string;
  placeholder?: string;
  onChange: (
    name: string,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  className?: string;
  validateValue?: (value: string) => boolean;
  errorMessage?: string;
  isFormSubmitted?: boolean;
}

const TextArea = (props: TextAreaProps) => {
  let {
    value,
    name,
    onChange,
    placeholder,
    className,
    validateValue,
    errorMessage,
    isFormSubmitted
  } = props;

  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (isFormSubmitted) {
      setTouched(true);
    }
  }, [isFormSubmitted]);

  const showError = validateValue ? !validateValue(value) && touched : false;

  function handleChange(event: any) {
    onChange(name, event);
  }

  function handleBlur() {
    setTouched(true);
  }

  return (
    <>
      <textarea
        className={`form-control ${className} ${showError ? "is-invalid" : ""}`}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onInput={handleChange}
        onBlur={handleBlur}
      />
      {showError && <small className="text-danger">{errorMessage}</small>}
    </>
  );
};

export default TextArea;
