import AutoComplete from "../ui/AutoComplete";
import Field from "../ui/Field";
import Input from "../ui/Input";
import Radio from "../ui/Radio";
import TextArea from "../ui/Textarea";
import Select from "../ui/Select";

export interface Props {
  field: any;
}

const FieldRenderer = function (props: Props) {
  let { field } = props;
  let {
    name,
    label,
    value,
    onChange,
    options,
    placeholder,
    gridSize = "",
    type,
    append,
    inputType,
    validateValue,
    formatValue,
    errorMessage,
    isFormSubmitted,
    isFormRow = true,
    resetToggle,
    display = true,
    fadeIn = false,
    showRequiredIcon
  } = field;

  function onACChange(name: string) {
    return (selection: Array<Object>) => onChange(name, selection);
  }

  function getFieldMarkup() {
    switch (type) {
      case "Textarea":
        return (
          <TextArea
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            validateValue={validateValue}
            errorMessage={errorMessage}
            isFormSubmitted={isFormSubmitted}
          />
        );

      case "Input":
        return (
          <Input
            name={name}
            type={inputType}
            placeholder={placeholder}
            value={value}
            append={append}
            onChange={onChange}
            validateValue={validateValue}
            formatValue={formatValue}
            errorMessage={errorMessage}
            isFormSubmitted={isFormSubmitted}
            resetToggle={resetToggle}
          />
        );

      case "Autocomplete":
        return (
          <AutoComplete
            placeholder={placeholder}
            options={options}
            onSelect={onACChange(name)}
          />
        );

      case "Radio":
        return (
          <Radio
            name={name}
            options={options}
            value={value}
            onChange={onChange}
            validateValue={validateValue}
            errorMessage={errorMessage}
            isFormSubmitted={isFormSubmitted}
          />
        );

      case "Select":
        return (
          <Select
            name={name}
            options={options}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            validateValue={validateValue}
            errorMessage={errorMessage}
            isFormSubmitted={isFormSubmitted}
          />
        );

      default:
        return <></>;
    }
  }

  if (!display) return <></>;

  return (
    <Field
      name={name}
      label={label}
      gridSize={gridSize}
      required={!!validateValue}
      isFormRow={isFormRow}
      fadeIn={fadeIn}
      showRequiredIcon={showRequiredIcon}
    >
      {getFieldMarkup()}
    </Field>
  );
};

export default FieldRenderer;
