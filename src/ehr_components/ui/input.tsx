export interface Prop {
  value: string
  name: string,
  placeholder?: string,
  append?: string,
  type?: string
  onChange: (name: string, event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: Prop) => {

  let { value, name, onChange, placeholder, append = '', type = 'text' } = props;

  function _onChange(event: any) {
    onChange(name, event);
  }

  function getInput() {
    return (
      <input
        type={type} 
        className="form-control" 
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={_onChange}
        onInput={_onChange}
      />
    )
  }

  return (
    <>
      {
        Boolean(append) ? (
          <div className="input-group">
            {getInput()}
            <div className="input-group-append">
              <span className="input-group-text">{append}</span>
            </div>
          </div>
        ) : getInput()
      }
    </>
  )
}

export default Input;