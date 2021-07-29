import AutoComplete from "../ui/autoComplete";
import Field from "../ui/field";
import Input from "../ui/input";
import Radio from "../ui/radio";
import TextArea from "../ui/textarea";
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
    formSubmitted
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
            formSubmitted={formSubmitted}
          />
        );

      case "Autocomplete":
        return (
          <AutoComplete
            title={placeholder}
            options={options}
            selected={onACChange(name)}
          />
        );

      case "Radio":
        return (
          <Radio
            name={name}
            options={options}
            value={value}
            onChange={onChange}
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
          />
        );

      default:
        return <></>;
    }
  }

  return (
    <Field name={name} label={label} gridSize={gridSize}>
      {getFieldMarkup()}
    </Field>
  );
};

export default FieldRenderer;
