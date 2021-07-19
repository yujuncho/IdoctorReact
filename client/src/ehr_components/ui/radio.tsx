import { Fragment } from "react";

export interface Prop {
  name: string,
  value: string
  options: Array<any>
  onChange: (name: string, event: React.ChangeEvent<HTMLInputElement>) => void
}

const Radio = (props: Prop) => {

  let { name, options = [], value, onChange } = props; 

  function _onChange(event: any) {
    onChange(name, event)
  }

  return (
    <Fragment>
      {
        options.map((option: any) => {
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
                {option.label}
              </label>
            </div>
          );
        })
      }
    </Fragment>
  )
}

export default Radio;