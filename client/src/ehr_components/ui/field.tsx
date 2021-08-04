export interface FieldProps {
  label: string;
  name: string;
  children: JSX.Element;
  gridSize?: string;
}

const Field = (props: FieldProps) => {
  let { label, name, children, gridSize } = props;

  return (
    <div className="form-row mb-4">
      <label htmlFor={name} className="col-sm-4 col-form-label text-left">
        {label}
      </label>
      <div className={`${gridSize ? gridSize : "col-sm-8"} text-left`}>
        {children}
      </div>
    </div>
  );
};

export default Field;
