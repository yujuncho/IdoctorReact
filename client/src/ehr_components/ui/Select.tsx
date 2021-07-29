export interface Prop {
  name: string;
  value: string;
  placeholder: string;
  options: Array<any>;
  onChange: (name: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Select = (props: Prop) => {
  let { name, options = [], value, placeholder, onChange } = props;

  function _onChange(event: any) {
    onChange(name, event);
  }

  return (
    <select
      className={`form-control ${
        placeholder.length > 0 && value.length > 0 ? "" : "text-muted"
      }`}
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
  );
};

export default Select;
