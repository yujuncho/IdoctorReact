export interface FieldProps {
  label: string;
  name: string;
  children: JSX.Element;
  gridSize?: string;
  required?: boolean;
}

const Field = (props: FieldProps) => {
  let { label, name, children, gridSize, required } = props;

  return (
    <div className="form-row mb-4">
      <label htmlFor={name} className="col-sm-4 col-form-label text-left">
        {required ? label + "*" : label}
      </label>
      <div className={`${gridSize ? gridSize : "col-sm-8"} text-left`}>
        {children}
      </div>
    </div>
  );
};

export default Field;
